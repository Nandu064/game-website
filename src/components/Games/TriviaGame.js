import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import MoneyModal from "../Modals/MoneyModal";
import { useNavigate } from "react-router-dom";
import AlertPopUp from "../Modals/Alert";
import questions from "./TriviaData.json";
import FlipCard from "flip-card-react";
import WinModal from "../Modals/WinModal";

const TriviaGame = () => {
  const navigate = useNavigate();

  const [alertPopUp, setAlertPopUp] = useState({
    open: false,
    color: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentGameTokens, setCurrentGameTokens] = useState();
  const [tabledata, setTabledata] = useState(questions);
  const [selectedcard, setSelectedcard] = useState({});
  const [winModal, setWinModal] = useState(false);

  const finishRef = useRef(false);
  const correctAnswersArray = useRef([]);
  const [generes] = useState([
    {
      name: "Levels",
      id: 1,
    },
    {
      name: "Books",
      id: 10,
    },
    {
      name: "Film",
      id: 11,
    },
    {
      name: "Music",
      id: 12,
    },
  ]);
  const [levels] = useState(["easy", "medium", "hard"]);
  const [moneyModal, setMoneyModal] = useState(false);
  const [score, setScore] = useState(0);
  const [lsquestions, setLsquestions] = useState([]);
  useEffect(() => {
    let lsScore = Number(localStorage.getItem("score"));
    // console.log("lsScore: ", lsScore);
    setScore(lsScore);
  }, []);
  useEffect(() => {
    let cTokens = Number(localStorage.getItem("g2"));
    // console.log("cTokens: ", cTokens);
    setCurrentGameTokens(cTokens);
    let answeredquestions = JSON.parse(localStorage.getItem("questions")) ?? [];
    if (answeredquestions.length > 0) {
      setGameStarted(true);
    }
    correctAnswersArray.current = answeredquestions;
    // console.log(
    //   "answeredquestions fl: ",
    //   answeredquestions.filter((v) => {
    //     console.log("v: ", v);
    //     return v.question === selectedcard;
    //   })
    // );
    // console.log("ans selectedcard: ", selectedcard);
    setLsquestions(answeredquestions);
    // console.log("answeredquestions: ", answeredquestions);
    let answeredQuestions = Number(localStorage.getItem("ansquestions"));
    // console.log("answeredQuestions: ", answeredQuestions);
    if (answeredQuestions === 9) {
      finishRef.current = true;
    }
  }, [correctAnswersArray.current.length]);

  const startGame = () => {
    if (gameStarted) {
      return;
      // window.location.reload();
    } else {
      if (Number(currentGameTokens) <= 0) {
        setAlertPopUp({
          open: true,
          message: "Not enough tokens",
          color: "danger",
        });
        return;
      }
      setLoading(false);
      setMoneyModal(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setAlertPopUp({
        ...alertPopUp,
        open: false,
      });
    }, 5000);
  }, [alertPopUp.open]);
  const handleOkay = () => {
    if (currentGameTokens < 200) {
      setAlertPopUp({
        open: true,
        message:
          "You don't have enough game tokens to play this game. Please add tokens  ans try Agian!!",
        color: "danger",
      });
      return;
    }

    setMoneyModal(false);
    // if (accepted) {

    setCurrentGameTokens(currentGameTokens - 200);
    localStorage.setItem("g2", currentGameTokens - 200);
    setGameStarted(true);

    //   document.getElementById(selectedNumber).style.background = "orange";
    // } else {
    //   return;
    // }
  };
  const handleMoneyModal = () => {
    setMoneyModal(!moneyModal);
  };
  const resetHandler = () => {
    localStorage.removeItem("score");
    localStorage.removeItem("ansquestions");
    localStorage.removeItem("questions");
    window.location.reload();
  };
  const finishHandler = () => {
    setWinModal(!winModal);
    let finalScore = Number(localStorage.getItem("score"));
    let avTokens = Number(localStorage.getItem("gT"));
    let total = avTokens + finalScore;
    localStorage.setItem("gT", total);
    let currentGT = Number(localStorage.getItem("g2"));
    localStorage.setItem("g2", finalScore + currentGT);
    // console.log("final", score);

    localStorage.removeItem("score");
    localStorage.removeItem("ansquestions");
    localStorage.removeItem("questions");
    window.location.reload();
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col md={10}>
          <Card>
            <CardHeader className="text-center">
              <Row className="d-flex align-items-center justify-content-between">
                <Col xs={6}>
                  <h3 className="title">Trivia Game</h3>
                </Col>
                <Col xs={2}>
                  <div className="d-flex justify-content-center align-items-center">
                    <h6 className="title">Score:</h6>
                    <small className="text-muted">{score}</small>
                  </div>
                </Col>
                <Col xs={3}>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Balance:{" "}
                    <span
                      style={{ fontSize: "16px", fontWeight: "500" }}
                      className="text-muted"
                    >
                      {currentGameTokens ?? 0}
                    </span>
                  </span>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="d-flex justify-content-center">
                <Col md={12}>
                  {/* {!loading ? (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                      <Spinner
                        animation="line"
                        role="status"
                        className="me-3"
                      />
                      <h5>Loading...</h5>
                    </div>
                  ) : ( */}
                  <Table className="border-0">
                    <thead>
                      {generes.map((genere) => (
                        <th key={genere.id} className="text-center">
                          {genere.name}
                        </th>
                      ))}
                    </thead>
                    <tbody>
                      {
                        levels.map((level) => (
                          <tr className="">
                            <td className="border-0 text-center text-capitalize d-flex align-items-center">
                              {level}
                            </td>
                            {generes
                              .filter((v) => v.name !== "Levels")
                              .map((genere) => {
                                return tabledata
                                  .filter(
                                    (item) => item.category === genere.name
                                  )
                                  .map((item) => {
                                    let question = item.questions.filter(
                                      (v) => v.difficulty === level
                                    )[0].question;

                                    return (
                                      <td className="border-0 text-center ">
                                        <Card>
                                          <CardBody
                                            className="p-3"
                                            style={{
                                              height: "150px",
                                            }}
                                          >
                                            {question}
                                          </CardBody>
                                          <CardFooter className=" bg-transparent border-0 d-flex justify-content-center align-items-center">
                                            <Row>
                                              {["True", "False"].map(
                                                (option) => (
                                                  <Col md={6} xs={6}>
                                                    <Button
                                                      variant="light"
                                                      style={{
                                                        background:
                                                          correctAnswersArray.current?.filter(
                                                            (v) =>
                                                              v.question ===
                                                              question
                                                          )[0]?.ans ===
                                                            option && "green",
                                                        // : "red",
                                                      }}
                                                      disabled={
                                                        lsquestions?.filter(
                                                          (v) =>
                                                            v.question ===
                                                            question
                                                        ).length > 0
                                                      }
                                                      onClick={(e) => {
                                                        // console.log(option);
                                                        if (gameStarted) {
                                                          localStorage.setItem(
                                                            "ansquestions",
                                                            Number(
                                                              localStorage.getItem(
                                                                "ansquestions"
                                                              )
                                                            ) + 1
                                                          );

                                                          let correctAns =
                                                            item.questions.filter(
                                                              (v) =>
                                                                v.difficulty ===
                                                                level
                                                            )[0].correct_answer;
                                                          correctAnswersArray.current =
                                                            [
                                                              ...correctAnswersArray.current,
                                                              {
                                                                question:
                                                                  question,
                                                                ans: correctAns,
                                                              },
                                                            ];
                                                          let obj =
                                                            JSON.stringify(
                                                              correctAnswersArray.current
                                                            );
                                                          localStorage.setItem(
                                                            "questions",
                                                            obj
                                                          );
                                                          // console.log(
                                                          //   "options correctAnswersArray.current: ",
                                                          //   correctAnswersArray.current
                                                          // );

                                                          setSelectedcard(
                                                            question
                                                          );
                                                          if (
                                                            correctAns ===
                                                            option
                                                          ) {
                                                            switch (level) {
                                                              case "easy":
                                                                setScore(
                                                                  (score) => {
                                                                    localStorage.setItem(
                                                                      "score",
                                                                      score +
                                                                        100
                                                                    );
                                                                    return (
                                                                      score +
                                                                      100
                                                                    );
                                                                  }
                                                                );

                                                                break;
                                                              case "medium":
                                                                setScore(
                                                                  (score) => {
                                                                    localStorage.setItem(
                                                                      "score",
                                                                      score +
                                                                        200
                                                                    );
                                                                    return (
                                                                      score +
                                                                      200
                                                                    );
                                                                  }
                                                                );

                                                                break;
                                                              case "hard":
                                                                setScore(
                                                                  (score) => {
                                                                    localStorage.setItem(
                                                                      "score",
                                                                      score +
                                                                        300
                                                                    );
                                                                    return (
                                                                      score +
                                                                      300
                                                                    );
                                                                  }
                                                                );

                                                                break;

                                                              default:
                                                                setScore(
                                                                  (score) =>
                                                                    score + 0
                                                                );
                                                                localStorage.setItem(
                                                                  "score",
                                                                  score + 0
                                                                );

                                                                break;
                                                            }
                                                          }
                                                        } else {
                                                          setAlertPopUp({
                                                            open: true,
                                                            message:
                                                              "Please Start Game",
                                                            color: "danger",
                                                          });
                                                        }
                                                      }}
                                                    >
                                                      {option}
                                                    </Button>
                                                  </Col>
                                                )
                                              )}
                                            </Row>
                                          </CardFooter>
                                        </Card>
                                      </td>
                                    );
                                  });
                              })}
                          </tr>
                        ))
                        // tabledata.filter
                      }
                    </tbody>
                  </Table>
                  {/* )} */}
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="bg-transparent border-0 d-flex justify-content-center">
              <Button
                color="primary"
                onClick={() => {
                  if (gameStarted && !Boolean(finishRef.current)) {
                    resetHandler();
                  } else {
                    if (Boolean(finishRef.current)) {
                      // finishHandler();
                      setWinModal(true);
                    } else {
                      startGame();
                    }
                  }
                }}
              >
                {Boolean(finishRef.current)
                  ? "Finish"
                  : gameStarted
                  ? "Restart"
                  : "Start Playing"}
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {moneyModal && (
        <MoneyModal
          show={moneyModal}
          toggle={handleMoneyModal}
          onOkay={() => {
            // handleContinue();
            setMoneyModal(!moneyModal);
            handleOkay();
            //   window.reload();
          }}
          onCancel={() => {
            setMoneyModal(!moneyModal);
            navigate("/p1.html");
          }}
          message={`This Game will charge you 200 tokens. Click Okay to
          continue or click Cancel to go to homepage.`}
          OkayButtonLabel={"Okay"}
          isCancel={true}
        />
      )}
      {winModal && (
        <WinModal
          continueHandler={finishHandler}
          toggle={() => setWinModal(!winModal)}
          cancelHandler={() => {
            setWinModal(!winModal);
            let finalScore = Number(localStorage.getItem("score"));
            localStorage.setItem("g2", currentGameTokens + finalScore);
            navigate("/p1.html");
          }}
          show={winModal}
          finalAmount={score}
        />
      )}
      <AlertPopUp
        alert={alertPopUp}
        toggleAlert={() => setAlertPopUp({ ...alertPopUp, open: false })}
      />
    </Container>
  );
};

export default TriviaGame;
