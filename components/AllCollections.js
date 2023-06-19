import React from 'react';
import {signOut} from "next-auth/react";

const AllCollections = (props) => {

  console.log(props.user);

  return (
    <div className="allcollections">
      <h4>User session:</h4>
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

export default AllCollections;