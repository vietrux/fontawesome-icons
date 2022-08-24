import axios from "axios";
import { useEffect, useState } from "react";

type IconModelProps = {
  style?: string;
  icon?: any;
}

export default function IconModel(props: IconModelProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [signal, setSignal] = useState(false);
  const [crrntStyle, setCrrntStyle] = useState("");
  const [coppied, setCoppied] = useState("");

  useEffect(() => {
    setCrrntStyle(props.style || props.icon.styles[0]);
  }, [props.icon.styles]);

  async function getSVG(stl:string,icname:string){
    const res = await axios.get(`/svgs/${stl}/${icname}.svg`);
    setCoppied(res.data)
  }

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="mx-auto w-[6rem] h-[6rem] m-[4px] mb-0 flex flex-col items-center justify-center border border-slate-200 rounded-t-[20%] cursor-pointer">
        <i className={`fa-${props.style} fa-${props.icon.iconname} fa-3x `}></i>

      </div>
      <p className="p-1 text-[12px] w-[6rem] mx-auto bg-slate-200 text-center rounded-b-[20%]">{props.icon.iconname}</p>
      {isOpen ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => {
            setIsOpen(false)
            setSignal(false)
          }
          }></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex">
                {props.icon.styles.map((style: string, index: number) => (
                  <div
                    key={props.icon.iconname + props.icon.styles[index]}
                    onClick={() => {
                      setCrrntStyle(props.icon.styles[index]);
                    }}
                    className={
                      props.icon.styles[index] === crrntStyle ? " px-3 py-1 rounded-lg bg-blue-200 cursor-pointer" : "px-3 p-1 cursor-pointer"
                    }>
                    <i className={`fa-${props.icon.styles[index]} fa-${props.icon.iconname}`}></i>
                  </div>
                ))}
              </div>

              <h1 className="font-bold text-xl w-full sm:w-auto">{props.icon.iconname}</h1>
              <div className="text-right w-full">
              <pre className="inline">
                <code className="text-[12px]">
                  {props.icon.unicode}
                </code>
              </pre>
              <i 
              onClick={async () => {
                await getSVG(crrntStyle,props.icon.iconname);
                await navigator.clipboard.writeText(coppied);
                setSignal(false);
                setTimeout(() => {
                  setSignal(true);
                }, 100);

              }}
              className="fa-solid fa-code mx-4 cursor-pointer"></i>
              </div>
              <div className="grid grid-rows-[30%_70%] sm:grid-cols-[30%_70%] gap-4 mx-4 py-4 sm:my-2 sm:py-2">
                <div
                  className="mx-auto w-[8rem] h-[8rem] m-[4px] mb-0 flex flex-col items-center justify-center  rounded-[20%] border border-slate-300 p-2">
                  <i className={`fa-${crrntStyle} fa-${props.icon.iconname} fa-5x`}></i>
                </div>
                <pre 
                onClick={() => {
                  navigator.clipboard.writeText(`<i class="fa-${crrntStyle} fa-${props.icon.iconname}"></i>`);
                  setSignal(false);
                  setTimeout(() => {
                    setSignal(true);
                  }, 100);
                }}
                className="bg-slate-800 text-white p-4 rounded-lg mr-4 cursor-pointer grid grid-cols-1 place-content-center overflow-x-auto">
                  <code className="text-sm font-semibold font-mono my-2 text-center">{`<i class="fa-${crrntStyle} fa-${props.icon.iconname}"></i>`}</code>
                </pre>
              </div>
              {signal && <div className="text-center text-[12px] text-slate-600">Copied!</div>}
              {
                props.icon.changes.map((change: string) => (
                  <span key={change} className="sm:ml-2 border border-blue-200 px-2 rounded-lg text-sm">{change}</span>
                ))
              }
              <div className="items-center gap-2 mt-3 sm:flex">
                <button className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => {
                    setIsOpen(false)
                    setSignal(false)
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </>

  )
}