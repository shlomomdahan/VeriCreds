import React from 'react';
import {signOut} from "next-auth/react";

const AllCollections = (props) => {

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

  return (
    <div className="allcollections p-12">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
      {/*<h4>User session:</h4>*/}
      {/*<pre>{JSON.stringify(props.user, null, 2)}</pre>*/}
      <ul className="divide-y divide-gray-200">
        {collection.map((document) => (
          <li key={document.name} className="py-4 flex">
            <img className="h-20 w-20" src={document.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{document.name}</p>
              <p className="text-sm text-gray-500">{document.format}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCollections;