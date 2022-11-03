import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Col,
  Alert,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/dealorNodeal.css";
function DealOrNoDeal() {
  const navigate = useNavigate();
  const [alertPopUp, setAlertPopUp] = useState({
    open: false,
    color: "",
    message: "",
  });
  const [boxes, setBoxes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedBox, setSelectedBox] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const unOpenedRef = useRef([]);
  const [displayedAmount, setDisplayedAmount] = useState([]);
  const selectedNumberRef = useRef(0);
  const [dealAmount, setDealAmount] = useState();
  const [dealModal, setDealModal] = useState(false);
  const [desicion, setDesicion] = useState("");
  const [winModal, setWinModal] = useState(false);
  const [lastOpenedBox, setLastOpenedBox] = useState();
  const [winAmount, setWinAmount] = useState();
  const winAmountRef = useRef();
  const [currentGameTokens, setCurrentGameTokens] = useState();

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  useEffect(() => {
    let arr = [];
    let amtArr = [];
    for (let i = 0; i < 13; i++) {
      let num = i + 1;
      arr.push(i + 1);
      amtArr.push(num * 5 * 100);
    }
    setBoxes(arr);

    unOpenedRef.current = arr;
    setAmounts(shuffle(amtArr));
    let gameTokens = Number(localStorage.getItem("g1"));
    setCurrentGameTokens(gameTokens);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setAlertPopUp({
        ...alertPopUp,
        open: false,
      });
    }, 5000);
  }, [alertPopUp.open]);
  useEffect(() => {
    if (desicion === "deal") {
      setWinModal(true);
      setWinAmount(dealAmount);
    }
  }, [desicion]);

  const handleDealModal = () => {
    setDealModal(!dealModal);
  };
  const numberHandler = (number) => {
    if (!gameStarted) {
      setAlertPopUp({
        open: true,
        color: "info",
        message: "Please click start button...",
      });
      return false;
    }
    setSelectedBox([...selectedBox, number]);
    let unOpenedarr = [...unOpenedRef.current];
    unOpenedRef.current = unOpenedarr.filter((v) => v !== number);
    console.log("unOpenedarr: ", unOpenedarr);

    setDisplayedAmount([...displayedAmount, amounts[number - 1]]);

    console.log("number: ", number);
    if (lastOpenedBox === number) {
      setWinModal(true);
      setWinAmount(amounts[lastOpenedBox - 1]);
      winAmountRef.current = amounts[lastOpenedBox];
    }
  };
  const handleContinue = () => {
    let avTokens = Number(localStorage.getItem("gT"));
    console.log("avTokens: ", avTokens);
    let total = avTokens + winAmount;
    localStorage.setItem("gT", total);
    localStorage.setItem("g1", currentGameTokens + winAmount);
    setWinModal(false);
    window.location.reload();
  };
  useEffect(() => {
    if (selectedBox.length === 5 || selectedBox.length === 10) {
      setDealModal(true);
      let ramdomNumber = Math.floor(Math.random() * amounts.length);
      let amount = amounts[ramdomNumber];
      setDealAmount(amount);
      if (desicion === "deal") {
        setWinAmount(amount);
      }
    }
  }, [selectedBox.length]);
  const startGame = () => {
    if (gameStarted) {
      window.location.reload();
    } else {
      console.log("currentGameTokens: ", currentGameTokens);
      if (Number(currentGameTokens) <= 0) {
        setAlertPopUp({
          open: true,
          message: "Not enough tokens",
          color: "danger",
        });
        return;
      }
      let number = parseInt(prompt("Select a box between 1 to 12"));
      //   setSelectedNumber(number);
      selectedNumberRef.current = number;
      setLastOpenedBox(number);

      console.log("selectedNumber: ", selectedNumberRef.current);
      if (number < 1 || number > 12) {
        setAlertPopUp({
          open: true,
          message: "Please select the number between 1 and 12",
          color: "info",
        });
        return false;
      }
      unOpenedRef.current = [
        ...unOpenedRef.current.filter((v) => v !== number),
      ];
      if (number) {
        setGameStarted(true);
      }
      //   document.getElementById(selectedNumber).style.background = "orange";
    }
  };
  function boxClick(elem) {
    if (!gameStarted) {
      alert("Please click start button...");
      return false;
    }

    // changing the box style after click
    let boxNum = elem.innerHTML;

    elem.parentNode.style.backgroundColor = "grey";

    elem.textContent = amounts[boxNum - 1];
    elem.onclick = nonclick;
    elem.style.cursor = "none";
    elem.style.color = "#fff";
    elem.style.fontSize = "20px";

    // Changing the style for amount text on the right side
    let amtClass = `.amt-${amounts[boxNum - 1]}`;
    if (amounts[boxNum - 1] == 0.1) {
      amtClass = ".amt-01";
    }

    let amountTextBox = document.querySelector(amtClass);
    amountTextBox.style.textDecoration = "line-through";
    amountTextBox.style.background = "grey";
  }
  function nonclick() {
    return false;
  }
  return (
    <div className="container">
      <Card className="w-100 mt-5">
        <CardHeader className="bg-transparent border-0 ">
          <Row className="d-flex align-items-center justify-content-between">
            <Col xs={8}>
              <h2 className="title">Deal | No Deal</h2>
            </Col>
            <Col xs={4}>
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
          <Row>
            <Col xs={8} className="mt-5">
              <Row className="row-container">
                {boxes.slice(0, 4).map((item) => (
                  <Col xs={3} key={item}>
                    <div
                      className={`${
                        selectedBox.includes(item) ? "selectedBox box" : "box"
                      } ${
                        selectedNumberRef.current === item
                          ? "defaultSelectedBox"
                          : ""
                      }`}
                      onClick={() =>
                        selectedNumberRef.current === item
                          ? unOpenedRef.current.length === 1
                            ? numberHandler(item)
                            : nonclick
                          : numberHandler(item)
                      }
                    >
                      <span id={item}>
                        {" "}
                        {selectedBox.includes(item)
                          ? `$ ${amounts[item - 1]}`
                          : item}
                      </span>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className="row-container">
                {boxes.slice(4, 8).map((item) => (
                  <Col xs={3} key={item}>
                    <div
                      className={`${
                        selectedBox.includes(item) ? "selectedBox box" : "box"
                      } ${
                        selectedNumberRef.current === item
                          ? "defaultSelectedBox"
                          : ""
                      }`}
                      onClick={() =>
                        selectedNumberRef.current === item
                          ? unOpenedRef.current.length === 1
                            ? numberHandler(item)
                            : nonclick
                          : numberHandler(item)
                      }
                    >
                      <span id={item}>
                        {selectedBox.includes(item)
                          ? `$ ${amounts[item - 1]}`
                          : item}
                      </span>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className="row-container">
                {boxes.slice(8, 12).map((item) => (
                  <Col xs={3} key={item}>
                    <div
                      className={`${
                        selectedBox.includes(item) ? "selectedBox box" : "box"
                      } ${
                        selectedNumberRef.current === item
                          ? "defaultSelectedBox"
                          : ""
                      }`}
                      onClick={() =>
                        selectedNumberRef.current === item
                          ? unOpenedRef.current.length === 1
                            ? numberHandler(item)
                            : nonclick
                          : numberHandler(item)
                      }
                    >
                      <span id={item}>
                        {selectedBox.includes(item)
                          ? `$ ${amounts[item - 1]}`
                          : item}
                      </span>
                    </div>
                  </Col>
                ))}
                <Row className="d-flex justify-content-center">
                  <Col xs={12} className="d-flex justify-content-center">
                    <Button
                      id="startButton"
                      className="restart-btn"
                      onClick={startGame}
                      color="primary"
                    >
                      {gameStarted ? "Restart Game" : "Start Playing"}
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col xs={4}>
              <div className="d-flex justify-content-center">
                <div>
                  <h3 className="amount-text">Amounts to Win</h3>
                  <ul>
                    {amounts.slice(0, 6).map((amount) => (
                      <li
                        className={`text-center amt-${amount} ${
                          displayedAmount.includes(amount) ? "revelAmount" : ""
                        }`}
                        key={amount}
                      >
                        $ {amount}
                      </li>
                    ))}
                  </ul>
                  <ul>
                    {amounts.slice(6, 12).map((amount) => (
                      <li
                        key={amount}
                        className={`text-center amt-${amount} ${
                          displayedAmount.includes(amount) ? "revelAmount" : ""
                        }`}
                      >
                        $ {amount}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* deal Modal */}
      <Modal isOpen={dealModal} toggle={handleDealModal}>
        <ModalHeader toggle={handleDealModal}>Offer</ModalHeader>
        <ModalBody>
          Here is a Deal of ${dealAmount}. Do you want to take it or risk it.
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setDesicion("nodeal");
              setDealModal(!dealModal);
            }}
          >
            No Deal
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => {
              setDesicion("deal");
              setDealModal(!dealModal);
            }}
          >
            Deal
          </Button>{" "}
        </ModalFooter>
      </Modal>
      {/* winning Modal */}
      <Modal isOpen={winModal} toggle={handleDealModal}>
        <ModalHeader toggle={handleDealModal}>You Won!!</ModalHeader>
        <ModalBody>
          Tada ! You won ${winAmount}. Do you want to continue?
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              handleContinue();
              setWinModal(!winModal);
              //   window.reload();
            }}
          >
            Continue
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => {
              setWinModal(!winModal);
              navigate("/p1.html");
            }}
          >
            Cancel
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Alert
        color={alertPopUp.color}
        isOpen={alertPopUp.open}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          height: "55px",
          maxWidth: "60%",
        }}
        toggle={() => setAlertPopUp({ ...alertPopUp, open: false })}
        fade={true}
      >
        <span className={`text-dark`}>{alertPopUp.message}</span>
      </Alert>
    </div>
  );
}

export default DealOrNoDeal;
