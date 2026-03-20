import { getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [ideas,setIdeas]= useState([])

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
      <h1 className="text-3xl font-bold underline">Dashboard Page</h1>
    </>
  );
};
export default Dashboard;
