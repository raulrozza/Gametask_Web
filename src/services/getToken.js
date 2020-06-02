export default function getToken(){
  const token = localStorage.getItem('loggedUser');

  return JSON.parse(token);
}
