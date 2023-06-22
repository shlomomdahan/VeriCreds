import React, {useState} from 'react';
import {signOut} from "next-auth/react";

const AllDocuments = (props) => {

  console.log(props.user);

  const collection = [
    {
      name: 'document1.pdf',
      format: 'PDF',
      image:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'document2.pdf',
      format: 'PDF',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'document3.png',
      format: 'PNG',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

  // Set state variable for showing grid view
  const [viewMode, setViewMode] = useState('list');


  return (
    <div className="allcollections p-12">
      {/*<button*/}
      {/*  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
      {/*  onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>*/}

      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut({ redirect: "/signin" })}>
          Sign out
        </button>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} id="grid">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current w-4 h-4 mr-2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
           <span>Grid</span>
          </button>
          <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2 ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} id="list">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current w-4 h-4 mr-2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            <span>List</span>
          </button>
        </div>
      </div>

      {/*<h4>User session:</h4>*/}
      {/*<pre>{JSON.stringify(props.user, null, 2)}</pre>*/}
      {viewMode === "list" && <ul className="divide-y divide-gray-200">
        {collection.map((document) => (
            <>
              <li data-tooltip-target="tooltip-default" key={document.name} className="py-4 flex hover:bg-gray-100">
                <img className="h-20 w-20" src={document.image} alt="" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{document.name}</p>
                  <p className="text-sm text-gray-500">{document.format}</p>
                </div>
              </li>
              {/*<div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">*/}
              {/*  {document.name}*/}
              {/*<div class="tooltip-arrow" data-popper-arrow={true}></div>*/}
              {/*</div>*/}
            </>
        ))}
      </ul>}
      {viewMode === "grid" && <ul className="grid grid-cols-4 gap-4">
        {collection.map((document) => (
          <li key={document.name} className="py-4 flex flex-col items-center hover:bg-gray-100">
            <img className="h-40 w-40" src={document.image} alt="" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">{document.name}</p>
              <p className="text-sm text-gray-500">{document.format}</p>
            </div>
          </li>
        ))}
      </ul>}
    </div>
  );
}

// <div class="grid grid-cols-4 gap-4">
//   <div>01</div>
//   <!-- ... -->
//   <div>09</div>
// </div>


export default AllDocuments;