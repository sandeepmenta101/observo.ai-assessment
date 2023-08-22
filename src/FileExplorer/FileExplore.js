import { useState } from "react";

import FileOrFolder from "./FileOrFolder";

export default function FileExplore({ explorer }) {
  const [expand, setExpand] = useState(false);

  const clickEvent = () => {
    setExpand(!expand);
  };

  if (
    explorer &&
    explorer.isDir &&
    explorer.children &&
    explorer.children.length > 0
  ) {
    return (
      <div className="folder">
        <FileOrFolder file={explorer} toggleFolder={(clickEvent)} expand={expand} />
          <div style={{ display: expand ? "block" : "none", paddingLeft: '10px' }}>
            {explorer.children.map((child) =>  <FileExplore explorer={child} />)}
          </div>
      </div>
    );
  } else if (explorer) {
    return <FileOrFolder file={explorer} />;
  }
}
