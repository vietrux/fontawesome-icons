import axios from 'axios';
import { useEffect, useState, useTransition } from 'react';
import category from './category.json';
import IconModel from './IconModel';

// var vicons: any[] = []
// async function fetchData() {
//   const result = await axios.get('/vicons.json');
//   vicons = result.data;
// }
// fetchData()


const vcategory = Object.keys(category).map(key => category[key as keyof typeof category]);
const vstyle = ["solid", "regular", "duotone", "brands", "light", "thin"];

export default function App() {
  const [vicons, setVicons] = useState([] as any[]);
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([] as any[])
  const [isPending, startTransition] = useTransition()
  const [listfilter, setListfilter] = useState([] as string[])
  const [liststyle, setListstyle] = useState([] as string[])
  const [listiconfilter, setListiconfilter] = useState([] as any[])
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('/vicons.json');
      setVicons(result.data); //vicons = result.data;
    }
    fetchData()
  }, [])


  useEffect(() => {
    query === ("") && listiconfilter.length === 0
      ?
      startTransition(() => {
        setResults(vicons.slice(20, 120))
      })
      :
      listiconfilter.length !== 0 ?
        startTransition(() => {
          setResults(vicons.filter((icon: any) => {
            return icon.label.toLowerCase().includes(query.toLowerCase()) && listiconfilter.includes(icon.iconname)
          }))
        })
        :
        startTransition(() => {
          setResults(vicons.filter((icon: any) => {
            return icon.label.toLowerCase().includes(query.toLowerCase())
          }))
        })

  }, [query, listiconfilter, vicons])

  useEffect(() => {
    const listicon = [] as any[]
    listfilter.forEach((element: string) => {
      listicon.push(...vcategory.find((category: any) => category.categoryname === element)?.icons as any[])
    })
    if (listicon.length !== 0) {
      liststyle.forEach((style: string) => {
        vicons.filter((icon: any) => icon.styles.includes(style))
      })
    }
    setListiconfilter(listicon)
  }
    , [listfilter, liststyle, vicons])

  return (
    <>
      <div className='p-8 sm:py-16 lg:p-16 '>
        <div className='flex justify-between'>
          <h1 className='text-[36px] font-bold'>Vicons</h1>
          <button onClick={() => setOpenNav(!openNav)} className='flex items-center px-4 text-white bg-gray-800 rounded-lg shadow-lg'>
            {
              openNav ?
                "Close"
                :
                "Filter"
            }
          </button>
        </div>
        <div className='flex'>

          {openNav ?
            <>
              <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => {
                setOpenNav(!openNav)
              }
              }></div>
              <div className="flex mr-4 fixed top-0 left-0 w-1/2 py-4 px-2 sm:w-1/4 justify-center bg-white shadow-2xl shadow-black">
                <div className='flex flex-col overflow-y-auto'>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-lg font-medium text-gray-900">Styles</span>
                    </div>
                  </div>
                  {vstyle.map((type: string) => (
                    <div key={type}>
                      <input id={type} type={'checkbox'} onChange={(e) => {
                        const { checked } = e.target
                        if (checked) {
                          setListstyle([e.target.value, ...liststyle])

                        } else {
                          setListstyle(liststyle.filter((item: string) => item !== e.target.value))

                        }
                      }
                      } value={type} />
                      <label htmlFor={type} className='text-sm ml-2'>{type.toUpperCase()}</label>
                    </div>
                  ))}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-lg font-medium text-gray-900">Category</span>
                    </div>
                  </div>
                  {vcategory.map((category: any) => (
                    <div key={category.label}>
                      <input id={category.categoryname} type={'checkbox'} onChange={(e) => {
                        const { checked } = e.target
                        if (checked) {
                          setListfilter([e.target.value, ...listfilter])

                        } else {
                          setListfilter(listfilter.filter((item: string) => item !== e.target.value))

                        }
                      }
                      } value={category.categoryname} />
                      <label htmlFor={category.categoryname} className='text-sm ml-2'>{category.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </>
            :
            null
          }

          <div className={'w-full'}>
            <div className='w-full'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Search
              </label>
              <input className="border border-gray-400 rounded-lg p-2 mb-2 w-full"
                type="text" value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  startTransition(() => {
                    setQuery(e.target.value.trim())
                  })
                }} />
            </div>
            {isPending ? <>Loading...</> :
              !isPending && results.length !== 0 ?
                <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">

                  {results.map((icon: any) => (
                    liststyle.length === 0 ? icon.styles.map((style: any) => (
                      <li key={icon.iconname + style}>
                        <IconModel icon={icon} style={style} />
                      </li>
                    ))
                      :

                      liststyle.map((style: string) => (
                        icon.styles.includes(style) &&
                        <li key={icon.iconname + style}>
                          <IconModel icon={icon} style={style} />
                        </li>
                      ))))}
                </ul>
                : 'Không tìm thấy kết quả nào'}
          </div>
        </div>
      </div>
    </>
  )
}

