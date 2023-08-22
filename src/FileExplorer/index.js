import FileExplore from "./FileExplore";
export default function ContainerFileExplorer({ fileExplorer }) {  
  return(
    <>
      {
        fileExplorer && fileExplorer.length > 0 ? fileExplorer.map((folder) => {
          return <FileExplore explorer={folder} key={folder.id}/>
        }): <p>No Folders</p>
      }
    </>
  )

}
