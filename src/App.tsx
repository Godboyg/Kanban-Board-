import { useState } from 'react'
import "./index.css"
import 'remixicon/fonts/remixicon.css'
import Add from './Components/Add';
import { useAppDispatch, useAppSelector } from './app/hooks';
import type { ColumnType } from './features/types';
import { deleteTask, moveTask } from './features/boardSlice';

function App() {

  const [open , setOpen] = useState<boolean>(false);
  const [current , setCurrent] = useState<ColumnType>()

  const dispatch = useAppDispatch();

  const [dragInfo, setDragInfo] = useState({
    taskId: null,
    fromColumn: null
  });

  const todo = useAppSelector((state) => state.board.columns.todo);
  const inProgress = useAppSelector((state) => state.board.columns.inProgress);
  const inReview = useAppSelector((state) => state.board.columns.inReview);
  const done = useAppSelector((state) => state.board.columns.done);
  console.log("todoo",todo);

  const handleClose = (val: boolean) => {
    try {
      setOpen(val);
      setCurrent("");
    } catch(Eror) {
      console.log(Eror);
    }
  }

  const handleSet = (e: any) => {
    try{
      const column = e.target.dataset.column;
      console.log("cl",column);
      setCurrent(column);
      setOpen(true);
    } catch(err) {
      console.log("error",err);
    }
  }

  const handleDragStart = (e: any) => {
    const taskId = e.target.dataset.taskid;
    const fromColumn = e.target.dataset.fromcolumn;

    setDragInfo({ taskId, fromColumn });
  }

  const handleDragOver = (e: any) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: any) => {
     e.preventDefault();
  
     const toColumn = e.currentTarget.dataset.column;

     if (!dragInfo.taskId || !dragInfo.fromColumn) return;

     dispatch(
       moveTask({
         taskId: dragInfo.taskId,
         from: dragInfo.fromColumn,
         to: toColumn
       })
     );

     setDragInfo({ taskId: null, fromColumn: null });
   };

   const handleDelete = (e: any) => {
    try{
      const yes = e.target.dataset.yes;
      const id = e.target.dataset.id;
      console.log("c and i", yes, id);
      dispatch(deleteTask({ column: yes , taskId: id }))
    } catch(Error) {
      console.log(Error);
    }
   }

  return (
    <div className='h-screen flex items-center overflow-auto justify-center w-full bg-black'>
      <div className="h-screen lg:w-[80%] w-[90%] rounded-md flex flex-col">
        <div className="p-4 w-full bg-gray-700 rounded-md">
          <h1 className='text-xl font-medium text-green-600 text-center'>Kanban Board</h1>
        </div>
        <div className="flex-1 flex-wrap w-full flex py-4 gap-5">
          <div
           className="h-56 w-60 custom-scrollbar rounded-md text-gray-400 bg-gray-800 p-2"
           data-column="todo"
           onDragOver={handleDragOver}
           onDrop={handleDrop}
           >
            <div className="flex flex-col gap-3">
              <div className="px-2 flex gap-2 cursor-pointer rounded-md hover:bg-gray-700">
                <div className="">
                  TO DO
                </div>
                <div className="">
                  {todo.length > 0 && todo.length}
                </div>
              </div>
              <div className="flex scrollbar-thin flex-col h-46 gap-1 overflow-auto">
                {
                  todo.length > 0 && 
                  todo.map((to) => {
                    if(!to.date) return;
                    const d = new Date(to.date);
                    const formatted = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
                   return (
                    <div className="bg-gray-700 hover:bg-gray-600 hover:cursor-pointer p-2"
                    draggable
                    data-taskid={to.id}
                    data-fromcolumn="todo"
                    onDragStart={handleDragStart}
                    >
                <div className="w-full flex items-center justify-between">
                  <div className="">
                    {to.title}
                  </div>
                  <div
                   className="h-5 w-5 flex hover:cursor-pointer items-center justify-center rounded-full border border-gray-400"
                   data-yes="todo"
                   data-id={to.id}
                  onClick={handleDelete}>
                    D
                  </div>
                </div>
                <div className="ml-4">
                  {formatted}
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="w-46 overflow-auto">
                    {to.description}
                  </div>
                  <div className="h-5 w-5 flex items-center justify-center rounded-full border border-gray-500">
                    <i className="ri-user-line"></i>
                  </div>
                </div>
                   </div>
                  )})
                }
              <button data-column="todo" className='bg-gray-800 py-1 hover:cursor-pointer flex px-3 gap-1 hover:bg-gray-700 transition duration-300 w-full'
              onClick={handleSet}>
                <i className="ri-add-large-line text-gray-400"></i>
                Create
              </button>
              </div>
            </div>
          </div>
          <div
           className="h-56 w-60 rounded-md text-gray-400 bg-gray-800 p-2"
           data-column="inProgress"
           onDragOver={handleDragOver}
           onDrop={handleDrop}>
            <div className="flex flex-col gap-3">
              <div className="px-2 flex gap-2 cursor-pointer rounded-md hover:bg-gray-700">
                <div className="">
                  In Progress
                </div>
                <div className="">
                  {inProgress.length > 0 && inProgress.length}
                </div>
              </div>
              <div className="flex scrollbar-thin flex-col h-46 overflow-x-auto gap-1">
                {
                  inProgress.length > 0 && 
                  inProgress.map((to) => {
                    if(!to.date) return;
                    const d = new Date(to.date);
                    const formatted = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
                   return (
                    <div className="bg-gray-700 hover:bg-gray-600 hover:cursor-pointer p-2"
                    draggable
                    data-taskid={to.id}
                    data-fromcolumn="inProgress"
                    onDragStart={handleDragStart}>
                <div className="w-full flex items-center justify-between">
                  <div className="">
                    {to.title}
                  </div>
                  <div
                   className="h-5 w-5 flex hover:cursor-pointer items-center justify-center rounded-full border border-gray-400"
                   data-yes="inProgress"
                   data-id={to.id}
                  onClick={handleDelete}>
                    D
                  </div>
                </div>
                <div className="ml-4">
                  {formatted}
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="w-43 overflow-auto">
                    {to.description}
                  </div>
                  <div className="h-5 w-5 flex items-center justify-center rounded-full border border-gray-500">
                    <i className="ri-user-line"></i>
                  </div>
                </div>
                    </div>
                  )})
                }
              <button data-column="inProgress" className='bg-gray-800 py-1 hover:cursor-pointer flex px-3 gap-1 hover:bg-gray-700 transition duration-300 w-full'
              onClick={handleSet}>
                <i className="ri-add-large-line text-gray-400"></i>
                Create
              </button>
              </div>
            </div>
          </div>
         <div
           className="h-56 w-60 rounded-md text-gray-400 bg-gray-800 p-2"
           data-column="inReview"
           onDragOver={handleDragOver}
           onDrop={handleDrop}>
            <div className="flex flex-col gap-3">
              <div className="px-2 flex gap-2 cursor-pointer rounded-md hover:bg-gray-700">
                <div className="">
                   In Review
                </div>
                <div className="">
                  {inReview.length > 0 && inReview.length}
                </div>
              </div>
              <div className="flex scrollbar-thin flex-col h-46 overflow-x-auto gap-1">
                {
                  inReview.length > 0 && 
                  inReview.map((to) => {
                    if(!to.date) return;
                    const d = new Date(to.date);
                    const formatted = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
                  return (
                    <div className="bg-gray-700 hover:bg-gray-600 hover:cursor-pointer p-2"
                    draggable
                    data-taskid={to.id}
                    data-fromcolumn="inReview"
                    onDragStart={handleDragStart}>
               <div className="w-full flex items-center justify-between">
                  <div className="">
                    {to.title}
                  </div>
                  <div
                   className="h-5 w-5 flex hover:cursor-pointer items-center justify-center rounded-full border border-gray-400"
                   data-yes="inReview"
                   data-id={to.id}
                  onClick={handleDelete}>
                    D
                  </div>
                </div>
                <div className="ml-4">
                   {formatted}
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="w-46 overflow-auto">
                    {to.description}
                  </div>
                  <div className="h-5 w-5 flex items-center justify-center rounded-full border border-gray-500">
                    <i className="ri-user-line"></i>
                  </div>
                </div>
                    </div>
                  )})
                }
              <button data-column="inReview" className='bg-gray-800 py-1 hover:cursor-pointer flex px-3 gap-1 hover:bg-gray-700 transition duration-300 w-full'
              onClick={handleSet}>
                <i className="ri-add-large-line text-gray-400"></i>
                Create
              </button>
              </div>
            </div>
          </div>
          <div
           className="h-56 w-58 rounded-md text-gray-400 bg-gray-800 p-2"
           data-column="done"
           onDragOver={handleDragOver}
           onDrop={handleDrop}>
            <div className="flex flex-col gap-3">
              <div className="px-2 flex gap-2 cursor-pointer rounded-md hover:bg-gray-700">
                <div className="">
                  done
                </div>
                <div className="">
                  {done.length > 0 && done.length}
                </div>
              </div>
              <div className="flex scrollbar-thin h-46 overflow-x-auto flex-col gap-1">
                {
                  done.length > 0 && 
                  done.map((to) =>{
                    if(!to.date) return;
                    const d = new Date(to.date);
                    const formatted = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;  
                   return (
                    <div className="bg-gray-700 hover:bg-gray-600 hover:cursor-pointer p-2"
                    draggable
                    data-taskid={to.id}
                    data-fromcolumn="done"
                    onDragStart={handleDragStart}>
                <div className="w-full flex items-center justify-between">
                  <div className="">
                    {to.title}
                  </div>
                  <div
                   className="h-5 w-5 flex hover:cursor-pointer items-center justify-center rounded-full border border-gray-400"
                   data-yes="done"
                   data-id={to.id}
                  onClick={handleDelete}>
                    D
                  </div>
                </div>
                <div className="ml-4">
                  {formatted}
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="w-45 overflow-auto">
                    {to.description}
                  </div>
                  <div className="h-5 w-5 flex items-center justify-center rounded-full border border-gray-500">
                    <i className="ri-user-line"></i>
                  </div>
                </div>
                    </div>
                  )})
                }
              <button data-column="done" className='bg-gray-800 py-1 hover:cursor-pointer flex px-3 gap-1 hover:bg-gray-700 transition duration-300 w-full'
              onClick={handleSet}>
                <i className="ri-add-large-line text-gray-400"></i>
                Create
              </button>
              </div>
            </div>
          </div>
        </div>
         {
          open && <Add close={handleClose} current={current!}/>
         }
      </div>
    </div>
  )
}

export default App