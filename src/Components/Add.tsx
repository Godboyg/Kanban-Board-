import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addTask } from '../features/boardSlice';
import type { ColumnType } from '../features/types';

type props = {
    close: (value: boolean) => void;
    current: ColumnType
}

function Add({ close , current }: props) {

    const [description , setDescription] = useState<string>()
    const [title , setTitle] = useState<string>()

    const todo = useAppSelector((state) => state.board.columns.todo);
    console.log("todo adn",todo , current);

    const dispatch = useAppDispatch();

    const handleCreate = () => {
        try {
            if(!description || !title) {
                return alert("missing title or description")
            };
            dispatch(addTask({ column: current, 
                task: {
                    id: crypto.randomUUID(),
                    title: title,
                    description: description,
                    date: new Date()
                }
            }))
            close(false);
        } catch(error) {
            console.log("error",error);
        }
    }

  return (
    <div className='h-screen flex
     items-center justify-center w-full absolute top-0 left-0 
     bg-black/50 text-white'>
        <div className="w-76 bg-black rounded-md p-2 text-gray-400">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="">{current}</div>
                    <i className="ri-close-line hover:cursor-pointer"
                    onClick={() => close(false)}></i>
                </div>
                <div className="flex flex-col gap-2">
                    <input type="text" placeholder='Set Title.' onChange={(e) => setTitle(e.target.value)}
                    className='w-full outline-none rounded-md p-2
                    h-10 resize-none border-cyan-800 border'/>
                    <textarea 
                    onChange={(e) => setDescription(e.target.value)} name="" placeholder='What needs to be done?' 
                    className='w-full outline-none rounded-md p-2
                    h-22 resize-none border-cyan-800 border' id=""></textarea>
                </div>
                <div className="w-full text-black hover:cursor-pointer flex items-center justify-center p-2 bg-blue-600 rounded-md"
                onClick={handleCreate}>
                    Create
                </div>
            </div>
        </div>
    </div>
  )
}

export default Add