import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'
import { Textarea } from '../ui/textarea'

const EditWorkspace = () => {
  return (
    <div className='relative w-full group'>
        <Textarea placeholder='Edit Canvas with AI...' className='w-full h-[100px] resize-none text-base! py-2.5 focus:placeholder-transparent placeholder:text-zinc-500' />
        <Button disabled className='absolute bottom-2 right-2 group text-white cursor-pointer' size="sm">
            Edit <Sparkles className="w-4 h-4" />
        </Button>
    </div>
  )
}

export default EditWorkspace