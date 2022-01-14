const DeleteRow = (props) => {
    const HandleDelete = () => {
      let subject = props.itemtodelete.subject;
      let tmp_semester = parseInt(props.itemtodelete.semester);
      fetch(
        'https://web-laba5-edu.herokuapp.com/v1/graphql',
        {
          method: "POST",
          body: JSON.stringify({
            query: `
              mutation MyMutation {
                delete_lab5_marks(where: {_and: {semester: {_eq: "${tmp_semester}"}, subject: {_eq: "${subject}"}}}) {
                  returning {
                    id
                    mark
                    semester
                    subject
                    teacher
                  }
                }
              }
            `,
            variables: {},
            operationName: "MyMutation"
          }),
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      ).then(res => res.json())
      .then((result) => {
        console.log(result);
      })
    }


    return(
        <button onClick={HandleDelete}>Delete</button>
    )
};

export default DeleteRow;