
const baseUrl = "https://api.themoviedb.org/3";

export async function get(endpoint:string){
    const url = baseUrl + endpoint;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTEzYTU2YWExM2MyY2Q2NDkyMzdkYWE4M2RiNWMzZSIsIm5iZiI6MTc2MzQ3ODc5My4xNCwic3ViIjoiNjkxYzhkMDk5NzA2YzY0NjI5NWUwNGJiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bQGZrQ0l9ALAXmMgRF7FP04iGQYp2JfeuN_CsIorpnw'
  }
    };
    try{
        const response = await fetch (url, options);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}