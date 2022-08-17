import { useState } from "react";

type IconModelProps = {
  icon?: any;
}

export default function IconModel(props: IconModelProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [signal, setSignal] = useState("");

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-[6rem] h-[6rem] m-[4px] flex flex-col items-center justify-center border border-slate-200 rounded-[30%] cursor-pointer">
        {
          props.icon ? (
            <svg className="w-8 h-8 fill-slate-600" viewBox={props.icon.svg[props.icon.styles[0] as keyof typeof props.icon.styles].viewBox}>
              <path d={props.icon.svg[props.icon.styles[0] as keyof typeof props.icon.styles].path} />
            </svg>
          )
            : null
        }
        <div
          style={
            {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              whiteSpace: "pre-line"
            }
          }
          className="text-center text-sm ">{props.icon.label}</div>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setIsOpen(false)}></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <h1 className="font-bold text-xl">{props.icon.label}</h1>
              <div className="mt-3 flex flex-wrap">
                {props.icon.styles.map((style: string, index:number) => (
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].raw);
                      setSignal("");
                      setTimeout(() => {
                        setSignal("Copied");
                      }, 300);
                      setTimeout(() => {
                        setSignal("");
                      } , 1000);
                    }}
                    className="w-[6rem] h-[6rem] m-[4px] flex flex-col items-center justify-center border border-slate-200 rounded-[30%] cursor-pointer">
                    {
                      props.icon ? (
                        <svg className="w-8 h-8 fill-slate-600" viewBox={props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].viewBox}>
                          <path d={props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].path} />
                        </svg>
                      )
                        : null
                    }
                    <div
                      style={
                        {
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          whiteSpace: "pre-line"
                        }
                      }
                      className="text-center text-sm ">{props.icon.styles[index]}</div>
                  </div>
                ))}
              </div>
              {signal}
              <div className="items-center gap-2 mt-3 sm:flex">
                <button className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setIsOpen(false)}
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