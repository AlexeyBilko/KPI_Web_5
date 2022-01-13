import { useEffect, useState } from 'react';
import './Main.css';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import DeleteRow from './DeleteRow';

function MainPage() {
  const [token, setToken] = useState("");
  const { getAccessTokenSilently, isAuthenticated, isLoading, error, logout } = useAuth0();

  const [marks, setMarks] = useState([]);
  const [subject, setSubject] = useState("");
  const [mark, setMark] = useState(0);
  const [semester, setSemester] = useState(0);
  const [teacher, setTeacher] = useState("");

  const [subjectToDelete, setSubjectToDelete] = useState("");
  const [semesterToDelete, setSemesterToDelete] = useState(0);

  const operationsDoc = `
  query MyQuery {
    lab5_marks {
      id
      user_id
      teacher
      subject
      semester
      mark
    }
  }
  `;

  useEffect(async ()=>{
    if (isAuthenticated) {
      const myToken = await getAccessTokenSilently();
      setToken(myToken);
      console.log(myToken);
    }
    else return <Login to="/login" />;
    if(token){
      fetch(
        'https://web-laba5-edu.herokuapp.com/v1/graphql',
        {
          method: "POST",
          body: JSON.stringify({
            query: operationsDoc,
            variables: {},
            operationName: "MyQuery"
          }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res => res.json()).then(
        (result) => {
          console.log(result);
          setMarks(result.data.lab5_marks);
        }
      )
    }
  },[token, isAuthenticated, operationsDoc])

  const handleAddLine = (event) => {
    event.preventDefault();
    fetch(
      'https://web-laba5-edu.herokuapp.com/v1/graphql',
      {
        method: "POST",
        body: JSON.stringify({
          query: `
            mutation MyMutation {
              insert_lab5_marks_one(object: {mark: ${parseInt(mark)}, semester: ${parseInt(semester)}, subject: "${subject}", teacher: "${teacher}"}) {
                id
                user_id
                teacher
                mark
                semester
                subject
              }
            }
          `,
          variables: {},
          operationName: "MyMutation"
        }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }
    ).then(res => res.json())
    .then((result) => {
      console.log(result);
    })
  }

  if (!isAuthenticated) return <Login to="/login" />;
  if (error) return <h1>{error.message}</h1>;
  if (isLoading) return <h1>Loading..</h1>;
  return (
    <main>
      <button onClick={logout}>logout</button>
    <div className="App">
        <form onSubmit={handleAddLine} id="msform">
            <fieldset>
                <h2 className="fs-title">Create New Line</h2>
                <input type="text" name="subject" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <input type="number" name="mark" placeholder="mark" value={mark} onChange={(e) => setMark(e.target.value)}/>
                <input type="number" name="semester" placeholder="semester" value={semester} onChange={(e) => setSemester(e.target.value)}/>
                <input type="text" name="teacher" placeholder="teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)}/>
                <input type="submit" name="next" className="next action-button" value="Add" />
            </fieldset>
        </form>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Mark</th>
              <th>Semester</th>
              <th>Teacher</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {marks.map(item => {
              return (
                <tr key={item.subject}>
                  <td>{ item.subject }</td>
                  <td>{ item.mark }</td>
                  <td>{ item.semester }</td>
                  <td>{ item.teacher }</td>
                  <td><DeleteRow itemtodelete={item} token={token}></DeleteRow></td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
    </main>
  );
}

export default MainPage;
