import useSettings from "@src/hooks/useSettings";
import InputSelectLanguage from "./InputSelectLanguage";
import { useFormik } from "formik";
import { useShallow } from "zustand/react/shallow";

export default function GeneralSetting() {
  const { miniWindow, sourceLang, targetLang, setState } = useSettings(
    useShallow((state) => ({
      miniWindow: state.miniWindow,
      sourceLang: state.sourceLang,
      targetLang: state.targetLang,
      setState: state.setState,
    }))
  );

  const formik = useFormik({
    initialValues: {
      miniWindow,
      sourceLang,
      targetLang,
      autoLaunch: false,
    },
    onSubmit: (values) => {
      setState(values);
    },
  });

  return (
    <>
      <div className="grow flex flex-col gap-4 mt-8">
        <div className="flex">
          <div className="w-1/3">Shortcut</div>
          <div className="flex gap-1">
            <kbd className="kbd">⌘</kbd>+<kbd className="kbd">⇧</kbd>+
            <kbd className="kbd">T</kbd>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">Source language</div>
          <InputSelectLanguage
            onChange={(val) => formik.setFieldValue("sourceLang", val)}
            value={formik.values.sourceLang}
          />
        </div>
        <div className="flex">
          <div className="w-1/3">Target language</div>
          <InputSelectLanguage
            onChange={(val) => formik.setFieldValue("targetLang", val)}
            type="targetLang"
            value={formik.values.targetLang}
          />
        </div>
        {/* <div className="flex">
          <div className="w-1/3">Use mini window</div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={(e) =>
              formik.setFieldValue("miniWindow", e.target.checked)
            }
            checked={formik.values.miniWindow}
          />
        </div>
        <div className="flex">
          <div className="w-1/3">Launch on startup</div>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            onChange={(e) =>
              formik.setFieldValue("autoLaunch", e.target.checked)
            }
            checked={formik.values.autoLaunch}
          />
        </div> */}
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-2">
        <form method="dialog">
          <button className="btn btn-outline">Close</button>
        </form>
        <button
          onClick={() => formik.handleSubmit()}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </>
  );
}
