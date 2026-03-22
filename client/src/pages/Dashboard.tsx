import { getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";
import type {Idea} from '@/types/idea.types'

const Dashboard = () => {
  const [ideas,setIdeas]= useState<Idea[]>([])

  useEffect(
    ()=>{
const fetchAllIdeas = async () => {
  const allIdeas = await getAllIdeaFunction()
  setIdeas(allIdeas)
  return;
} 
fetchAllIdeas()
}
    ,[]
  )
  return (
    <>
     {ideas.map((idea)=>(
      <div key={idea._id}>
        <div>{idea.title}</div>
      </div>
     ))}
    </>
  );
};
export default Dashboard;
