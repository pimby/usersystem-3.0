import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  completeSingleTask,
  deleteSingleTask,
  getTasks,
  unassignTask,
  unCompleteSingleTask,
} from "../../redux/actions/taskActions";

import { Container, Card, Button, Table } from "react-bootstrap";
import { CreateTask } from "./CreateTask";
import { UpdateTask } from "./UpdateTask";
import { AssignTask } from "./AssignTask";

const Tasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const { tasks } = useSelector((state) => state.tasks);

  let data = tasks;
  // data ? console.log(data) : console.log("empty");
  return (
    <Container>
      <Card>
        <CreateTask />
      </Card>
      {data.length >= 1 ? (
        <Table striped borderless responsive="lg" hover>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Duration</th>
              <th>Description</th>
              <th>start date</th>
              <th>end date</th>
              <th>Update</th>
              <th>Complete</th>
              <th>assign</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.duration}</td>
                <td>{data.description}</td>
                <td>{moment.utc(data.start_date).format("DD/MM/YY")}</td>
                <td>{moment.utc(data.end_date).format("DD/MM/YY")}</td>
                <td>
                  <UpdateTask project_id={data.project_id} task_id={data._id} />
                </td>
                <td>
                  {data.isCompleted ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(unCompleteSingleTask(data._id));
                      }}
                    >
                      UnComplete
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => {
                        dispatch(completeSingleTask(data._id));
                      }}
                    >
                      complete
                    </Button>
                  )}
                </td>
                <td>
                  {data.assigned ? (
                    <Button
                      onClick={() => {
                        dispatch(unassignTask(data._id));
                      }}
                    >
                      Unassign
                    </Button>
                  ) : (
                    <AssignTask
                      project_id={data.project_id}
                      task_id={data._id}
                    />
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(deleteSingleTask(data._id, data.project_id));
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card>No Tasks Available</Card>
      )}
    </Container>
  );
};

export default Tasks;
