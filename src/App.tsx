import { useEffect, useState, useTransition } from 'react';
//import category from './category.json';
import IconModel from './IconModel';
import viconslist from './vicons.json';

//conver object to array viconslist
const vicons = Object.keys(viconslist).map(key => viconslist[key as keyof typeof viconslist]);

export default function Example() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(vicons.slice(0, 100))
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
  query === ("" || undefined)
    ? setResults(vicons.slice(0, 100))
    :
    startTransition(() => {
      setResults(vicons.filter((icon: any) => {
        return icon.label.toLowerCase().includes(query.toLowerCase())
      }))
    })
  }, [query])


  return (
    <>
      <div className='p-8 sm:p-16'>
        <h1 className='text-[36px] font-bold'>Vicons</h1>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Search
            </label>
            <input className="border border-gray-400 rounded-lg p-2 mb-2 "
              type="text" value={query}
              onChange={(e) => {
                setQuery(e.target.value.trim())
              }} />
          </div>
          <h1>Click on a vicon to copy it to your clipboard</h1>
        </div>
        {isPending ? <>Loading...</> : 
         !isPending && results.length !== 0 ? 
        <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-4">

          { results.map((icon: any) => (
            <li key={icon.iconname}>
              <IconModel icon={icon} />
            </li>
          ))
            }
        </ul>
        :'Không tìm thấy kết quả nào'}
      </div>
    </>
  )
}

