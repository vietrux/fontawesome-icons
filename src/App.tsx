import axios from 'axios';
import { useEffect, useState, useTransition } from 'react';
import category from './category.json';
import IconModel from './IconModel';

var vicons: any[] = []
async function fetchData() {
  const result = await axios.get('/vicons.json');
  vicons = result.data;
}
fetchData()


const vcategory = Object.keys(category).map(key => category[key as keyof typeof category]);
const vstyle = ["solid", "regular", "duotone", "brands", "light", "thin"];

export default function App() {

  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([] as any[])
  const [isPending, startTransition] = useTransition()
  const [listfilter, setListfilter] = useState([] as string[])
  const [liststyle, setListstyle] = useState([] as string[])
  const [listiconfilter, setListiconfilter] = useState([] as any[])

  useEffect(() => {
    query === ("") && listiconfilter.length === 0
      ? setResults(vicons.slice(0, 100))
      :
      listiconfilter.length !== 0 ?
        setResults(vicons.filter((icon: any) => {
          return icon.label.toLowerCase().includes(query.toLowerCase()) && listiconfilter.includes(icon.iconname)
        }))
        :
        setResults(vicons.filter((icon: any) => {
          return icon.label.toLowerCase().includes(query.toLowerCase())
        }))
  }, [query, listiconfilter, liststyle])



  useEffect(() => {
    const listicon = [] as any[]
    listfilter.forEach((element: string) => {
      listicon.push(...vcategory.find((category: any) => category.categoryname === element)?.icons as any[])
    })
    if (listicon.length !== 0) {
      liststyle.forEach((style: string) => {
        vicons.filter((icon: any) => icon.styles.includes(style)).forEach((icon: any) => {
        })
      })
    }
    setListiconfilter(listicon)
  }
    , [listfilter, liststyle])



  return (
    <>
      <div className='p-8 sm:py-16 lg:p-16 '>
        <h1 className='text-[36px] font-bold'>Vicons</h1>
        <div className='flex'>
          <div className='w-1/5 hidden sm:flex'>
            <div className='flex flex-col'>
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
          <div>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Search
                </label>
                <input className="border border-gray-400 rounded-lg p-2 mb-2 "
                  type="text" value={input}
                  onChange={(e) => {
                    setInput(e.target.value.trim())
                    startTransition(() => {
                      setQuery(e.target.value.trim())
                    })
                  }} />
              </div>
              <h1>Click on a vicon to copy it to your clipboard</h1>
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

