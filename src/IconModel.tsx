import { useState } from "react";

type IconModelProps = {
  style?: string;
  icon?: any;
}

export default function IconModel(props: IconModelProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [signal, setSignal] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="mx-auto w-[6rem] h-[6rem] m-[4px] mb-0 flex flex-col items-center justify-center border border-slate-200 rounded-t-[10%] cursor-pointer">
        <i className={`fa-${props.style} fa-${props.icon.iconname} fa-3x `}></i>

      </div>
      <p className="p-1 text-[12px] w-[6rem] mx-auto bg-slate-200 text-center rounded-b-[10%]">{props.icon.iconname}</p>
      {isOpen ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => {
            setIsOpen(false)
            setSignal(false)
          }
          }></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex items-center flex-wrap">
                <h1 className="font-bold text-xl w-full sm:w-auto">{props.icon.iconname}</h1>
                {
                  props.icon.changes.map((change: string) => (
                    <span key={change} className="sm:ml-2 border border-blue-200 px-2 rounded-lg">{change}</span>
                  ))
                }
              </div>
              <h1 className="text-[12px] my-2">Click on a vicon to copy it to your clipboard</h1>
              <div className="mt-3 flex flex-wrap justify-around sm:justify-between">
                {props.icon.styles.map((style: string, index: number) => (
                  <div 
                  key={props.icon.iconname + props.icon.styles[index]}
                  className="mx-1 mb-2">
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(`<i class="fa-${props.icon.styles[index]} fa-${props.icon.iconname}"></i>`);
                      setSignal(false);
                      setTimeout(() => {
                        setSignal(true);
                      }, 100);
                    }}
                    className="mx-auto w-[6rem] h-[6rem] m-[4px] mb-0 flex flex-col items-center justify-center border border-slate-200 rounded-t-[10%] cursor-pointer">
                    <i className={`fa-${props.icon.styles[index]} fa-${props.icon.iconname} fa-3x`}></i>
                  </div>
                  <p className="p-1 text-[12px] w-[6rem] mx-auto bg-slate-200 text-center rounded-b-[10%]">{props.icon.iconname}</p>
                  </div>
                  
                ))}
              </div>
              {signal && <div className="text-center text-[12px] text-slate-600">Copied!</div>}
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