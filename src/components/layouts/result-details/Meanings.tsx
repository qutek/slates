import { map } from "lodash";

export default function Meanings({ data }: any) {
  return map(data, (item, i) => (
    <div key={i} className="card card-compact bg-base-100 shadow-xl my-2">
      <div className="card-body">
        <div className="flex flex-col">
          <div className="badge badge-outline badge-accent badge-sm">
            {item?.pos}
          </div>
          <span className="text-lg font-semibold">{item?.meaning}</span>
        </div>
        {item.synonyms && (
          <div className="card-actions">
            <div className="font-semibold">Synonyms:</div>
            { map(item.synonyms, (synonym, i) => <div key={i} className="badge badge-lg badge-outline">{synonym}</div>) }
          </div>
        )}
      </div>
    </div>
  ));
}
