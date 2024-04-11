// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// https://tauri.app/v1/guides/features/system-tray
use tauri::SystemTray;
use tauri::{CustomMenuItem, Manager, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri_plugin_positioner::{Position, WindowExt};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
  // move window to topright
  // let window = tauri::Manager::current_window().unwrap();
  // window.move_window(Position::TopRight);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    // create tray menu
    let quit: CustomMenuItem = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("CommandOrControl+Q");
    let hide: CustomMenuItem = CustomMenuItem::new("hide".to_string(), "Hide").accelerator("CommandOrControl+H");
    let tray_menu: SystemTrayMenu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_positioner::init())
        .setup(|app| {
          // positioning the window to top right.
          let window = app.get_window("main").unwrap();
          let _ = window.move_window(Position::TopRight);
          // disable app icon
          // https://github.com/tauri-apps/tauri/discussions/6038#discussioncomment-4687750
          app.set_activation_policy(tauri::ActivationPolicy::Accessory);
          Ok(())
        })
        .system_tray(SystemTray::new().with_menu(tray_menu))
        // This is required to get tray-relative positions to work
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a left click");

                    let window = app.get_window("main").unwrap();
                    // let _ = window.move_window(Position::TopRight);

                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::RightClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a right click");
                }
                SystemTrayEvent::DoubleClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a double click");
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            // detect click outside of the focused window and hide the app
            tauri::WindowEvent::Focused(is_focused) => {
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }

            // Prevent app close.
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
