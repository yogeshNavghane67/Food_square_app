import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  
  


  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
    
      try {
        const response = await fetch(BASE_URL);
      
        const json = await response.json();
      
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  },[]);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if(searchValue === ""){
      setFilteredData(null);
    }
    const filter = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };


const filterFood  = (type) => {
  if(type === "alt"){
    setFilteredData(data);
    setSelectedBtn("all");
    return;
  }
  const filter = data?.filter((food) =>
  food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilteredData(filter);
  setSelectedBtn(type);
};

const filterBtns =[
  {
    name: "All",
    type: "",
  },
  {
    name: "Breakfast",
    type: "breakfast",
  },
  {
    name: "Lunch",
    type: "lunch",
  },
  {
    name: "Dinner",
    type: "dinner",
  }
];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  
  return (
    <>
   <Container>
     <TopContainer>
      <div className="Logo">
        <img src="Food square.png" alt="logo" /> 
      </div>
      <div className="search">
        <input onChange={searchFood} placeholder="Search Food"/>
      </div>
     </TopContainer>
     <FilterContainer>
      {
        filterBtns.map((value) => (
          <Button isSelected={selectedBtn === value.type}
          key={value.name} onClick={() => filterFood(value.type)}>
            {value.name}
          </Button>
        ))
      }
     </FilterContainer>
   </Container>
   <SearchResult data={filteredData}/>
   </>
  );
};

export default App;

export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;
`;
const TopContainer = styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding:16px;
align-items: center;

.Logo{
  img{
    margin-top: -10px;
    width: 290px;
    height: 200px;
  }
}

.search {
  input{
    background-color: transparent;
    border: 1px solid #FF4343;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    width: 110%;
    &::placeholder{
      color: #fff;
      padding: 5%;
    }
  }
}

@media (0 < width < 600px) {
  flex-direction: column;
  height: 80px;

  .Logo{
    img{
      padding-bottom: 45px;
    
    }
  }
  .search {
    input{
      padding-bottom: px;
      
    }
  }
        
}
`;
const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 20px;

@media (0 < width < 600px) {
  padding-bottom: 2px;
}
`;

export const Button = styled.button`
background: ${({ isSelected }) => (isSelected ? "#d63a02" : "#ff4343")};
outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#f42a2a")};
background: #ea3c02;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover{
  background-color: #a02e2e;
  outline: 1px solid white;
}
width: 85px;
height: 30px;
font-size: 15px;
`;


