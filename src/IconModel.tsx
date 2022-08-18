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
        className="w-[6rem] h-[6rem] m-[4px] flex flex-col items-center justify-center border border-slate-200 rounded-[30%] cursor-pointer">
        {!props.style ?
          props.icon ? (
            <svg className="w-8 h-8" viewBox={props.icon.svg[props.icon.styles[0] as keyof typeof props.icon.styles].viewBox}>
              <path className="fill-slate-600" d={props.icon.svg[props.icon.styles[0] as keyof typeof props.icon.styles].path} />
            </svg>
          )
            : null
          : props.style && props.style === "duotone" ?
            (
              <>
                <svg className="w-8 h-8" viewBox={props.icon.svg[props.style].viewBox}>
                  <path className="fill-slate-400" d={props.icon.svg[props.style].path[0]} />
                  <path className="fill-slate-800" d={props.icon.svg[props.style].path[1]} />
                </svg>
              </>
            ) : 
            (
              <svg className="w-8 h-8" viewBox={props.icon.svg[props.style].viewBox}>
                <path className="fill-slate-600" d={props.icon.svg[props.style].path} />
              </svg>
            ) 
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
          className="text-center text-sm ">{props.icon.iconname}</div>
      </div>
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
                <h1 className="font-bold text-xl">{props.icon.iconname}</h1>
                {
                  props.icon.changes.map((change: string) => (
                    <span key={change} className="ml-2 border border-blue-200 px-2 rounded-lg">{change}</span>
                  ))
                }
              </div>
              <h1 className="text-sm my-2">Click on a vicon to copy it to your clipboard</h1>
              <div className="mt-3 flex flex-wrap justify-around sm:justify-between">
                {props.icon.styles.map((style: string, index: number) => (
                  <div
                    key={props.icon.iconname + props.icon.styles[index]}
                    onClick={() => {
                      navigator.clipboard.writeText(props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].raw);
                      setSignal(false);
                      setTimeout(() => {
                        setSignal(true);
                      }, 100);
                    }}
                    className="w-[6rem] h-[6rem] m-[4px] flex flex-col items-center justify-center border border-slate-200 rounded-[30%] cursor-pointer">
                    {
                      props.icon ? (
                        <svg className="w-8 h-8" viewBox={props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].viewBox}>
                          {
                            props.icon.styles[index] === "duotone" ? (
                              <>
                                <path className="fill-slate-400" d={props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].path[0]} />
                                <path className="fill-slate-800" d={props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].path[1]} />
                              </>
                            ) : (
                              <path className="fill-slate-600" d={props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].path} />
                            )
                          }
                        </svg>
                        // <div
                        //   dangerouslySetInnerHTML={{ __html: props.icon.svg[props.icon.styles[index] as keyof typeof props.icon.styles].raw }} />
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
              {signal && <div className="text-center text-sm text-slate-600">Copied!</div>}
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