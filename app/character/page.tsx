import Link from "next/link";
import React from "react";

const Character = () => {
  return (
    <div>
      <h1>List of Created Characters</h1>

      <Link href={"character/new"}>
        <button>New Character</button>
      </Link>
    </div>
  );
};

export default Character;
