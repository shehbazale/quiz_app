import { ResultPageProps } from '@/dataType/type'
import React from 'react'

const ResultPage:React.FC<ResultPageProps> = ({
    maxScore,
    restartQuiz
}) => {
  const result = maxScore > 40 ? 'Congtrats Pass' : 'Sorry! Fail'
  return (
    <>
   <div className='flex  flex-col justify-center items-center p-6 h-72 space-y-3'>
        
    <h2 className='font-bold text-3xl'>{maxScore}%</h2>
    <p className='font-bold text-3xl'>{result}</p>
    <button   className="!mt-6 px-4 py-2 rounded bg-[#c0c3c7] transition-all ease-in-out duration-500 hover:bg-[#dcdfe2] hover:shadow-lg text-black cursor-pointer" onClick={restartQuiz}>Restart Quiz</button>
    </div>
    </>
  )
}

export default ResultPage