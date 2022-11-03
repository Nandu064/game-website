import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  CardImg,
} from "reactstrap";
import "../styles/landingStyles.css";
function LandingPage() {
  const [balanceTokens, setBalanceTokens] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showSplitTokensModal, setShowSplitTokensModal] = useState(false);
  const [splitTokens, setSplitTokens] = useState();
  const [tokens, setTokens] = useState(null);
  const [totalTokens, setTotalTokens] = useState();
  const [gameTokens, setGameTokens] = useState({});
  const [selectedGame, setSelectedGame] = useState("");
  useEffect(() => {
    let tokens = Number(localStorage.getItem("gT"));
    console.log("tokens: ", tokens);
    setBalanceTokens(tokens ?? 0);
  }, [showModal]);
  useEffect(() => {
    let tokens = Number(localStorage.getItem("gT"));
    setTotalTokens(tokens);
  }, []);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleSplitModal = () => {
    setShowSplitTokensModal(!showSplitTokensModal);
  };
  const handleSubmit = (values) => {
    let lstokens = localStorage.getItem("gT");
    console.log("lstokens: ", lstokens);
    if (lstokens) {
      lstokens = Number(lstokens);
    } else {
      lstokens = 0;
    }
    localStorage.setItem("gT", Number(lstokens) + Number(tokens));
    setTotalTokens(lstokens + tokens);
    handleModal();
  };
  const handleSplitSubmit = (game) => {
    // localStorage.setItem("gT", tokens);
    // let totalTokens = Number(localStorage.getItem("gT"));
    let splitToken = Number(splitTokens);
    console.log("splitToken: ", splitToken);
    console.log("totalTokens: ", totalTokens);
    if (splitToken <= totalTokens) {
      let tokens = Number(localStorage.getItem("gT"));
      localStorage.setItem("gT", tokens - splitToken);
      let gameTokens = Number(localStorage.getItem(game));
      console.log("gameTokens: ", gameTokens);
      let totalGameTokens = gameTokens + splitToken;
      console.log("splitTokens: ", typeof splitToken);
      console.log("totalGameTokens: ", totalGameTokens);
      localStorage.setItem(game, gameTokens + splitToken);
      setBalanceTokens(tokens - splitToken);
      setGameTokens({ ...gameTokens, [game]: gameTokens + splitToken });

      // console.log("tokens: ", tokens);

      handleSplitModal();
    } else {
      alert("Tokens should not exceed total tokens");
    }
  };
  useEffect(() => {
    let game1Tokens = Number(localStorage.getItem("g1"));
    console.log("game1Tokens: ", game1Tokens);
    let game2Tokens = Number(localStorage.getItem("g2"));
    console.log("game2Tokens: ", game2Tokens);
    let obj = {
      g1: game1Tokens,
      g2: game2Tokens,
    };
    setGameTokens(obj);
  }, [showSplitTokensModal]);
  console.log("gameTokens: ", gameTokens);

  const gameClickHanlder = (game) => {
    console.log("game: ", game);
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6} className="text-center mt-4">
          <Card>
            <CardHeader className="d-flex justify-content-end align-items-center bg-transparent border-0">
              <div className="balance d-flex align-items-center ">
                <h6
                  className="mb-0"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Balance:
                </h6>
                <small className="count">&nbsp;{balanceTokens}</small>
                <span className="plusButton" onClick={handleModal}>
                  +
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} md={10} className="bg-secondary m-auto">
                  <div className="w-100 p-3" onClick={gameClickHanlder("g1")}>
                    <Link
                      to="/deal-or-nodeal"
                      style={{ textDecoration: "none" }}
                    >
                      <Card className="p-3 d-flex">
                        <CardBody className="d-flex justify-content-start p-0">
                          <div className="item_image d-flex align-items-center">
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "6px",
                              }}
                              src="https://msngames.online/assets/cache_image/games/deal-or-no-deal_250x150_a3c.webp"
                              alt="img"
                            />
                          </div>
                          <div
                            className="title ms-2"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <h5
                              className="mb-0"
                              style={{
                                textAlign: "left",
                                textDecoration: "none !important",
                                color: "#000",
                              }}
                            >
                              Deal or No-Deal
                            </h5>
                            <div
                              className="text-muted"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              <span style={{ display: "inline-block" }}>
                                Available Tokens: {gameTokens["g1"] ?? 0}
                              </span>
                              <span
                                style={{ display: "inline-block" }}
                                className="plusButton"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedGame("g1");
                                  handleSplitModal();
                                }}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                </Col>
                <Col xs={12} md={10} className="bg-secondary m-auto">
                  <div className="w-100 p-3">
                    <Link to="/trivia" style={{ textDecoration: "none" }}>
                      <Card className="p-3 d-flex">
                        <CardBody className="d-flex justify-content-start p-0">
                          <div className="item_image d-flex align-items-center">
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "6px",
                              }}
                              src="https://msngames.online/assets/cache_image/games/deal-or-no-deal_250x150_a3c.webp"
                              alt="img"
                            />
                          </div>
                          <div
                            className="title ms-2"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <h5
                              className="mb-0"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              Trivia Game
                            </h5>
                            <div
                              className="text-muted"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              <span style={{ display: "inline-block" }}>
                                Available Tokens: {gameTokens["g2"] ?? 0}
                              </span>
                              <span
                                style={{ display: "inline-block" }}
                                className="plusButton"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedGame("g2");
                                  handleSplitModal();
                                }}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={showModal} toggle={handleModal}>
        <ModalHeader toggle={handleModal}>Add Tokens</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Tokens</Label>
              <Input
                type="text"
                val
                name="tokens"
                id="tokens"
                placeholder="Enter tokens you want to add"
                onChange={(e) => setTokens(e.target.value)}
              />
            </FormGroup>
          </Form>
          <small className="text-danger">* one token = 1$</small>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleModal}>
            Cancel
          </Button>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Add
          </Button>{" "}
        </ModalFooter>
      </Modal>
      {/* split tokens modal */}
      <Modal isOpen={showSplitTokensModal} toggle={handleSplitModal}>
        <ModalHeader toggle={handleSplitModal}>Split Tokens</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Tokens</Label>
              <Input
                type="number"
                val
                name="tokens"
                id="tokens"
                placeholder="Enter tokens you want to split"
                onChange={(e) => setSplitTokens(e.target.value)}
                min={0}
                max={totalTokens}
              />
            </FormGroup>
          </Form>
          <small className="text-danger">* one token = 1$</small>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleSplitModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => handleSplitSubmit(selectedGame)}
          >
            Split
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default LandingPage;
