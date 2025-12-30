import type { JSX } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Filter, X } from 'lucide-react'

type FiltersProps = {
  form: JSX.Element;
  clear: () => void;
  applied: number;
}

const Filters = ({form, applied, clear}: FiltersProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full lg:w-max shadow-xl border-0 outline-0'>
        <Button variant="default" size={"lg"} className='w-full' >
          <Filter />
          Apply filters {applied > 0 ? `(${applied})` : ''}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='flex justify-between'>
          <AlertDialogTitle className='text-2xl text-primary font-semibold mb-4'>Filter by</AlertDialogTitle>
          <AlertDialogCancel className='border-0 shadow-none rounded-full' >
            <X className='size-6 text-primary' />
          </AlertDialogCancel>
        </AlertDialogHeader>
        {form}
        <AlertDialogFooter>
          <AlertDialogCancel size={"lg"} className='shadow-xl' onClick={clear} >Clear filters</AlertDialogCancel>
          <AlertDialogAction form='actorsFilters' type={'submit'} size={"lg"} className='shadow-xl' >Apply Filters</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Filters