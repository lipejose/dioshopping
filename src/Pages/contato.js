import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  ListItem,
  Divider,
  ListItemText,
  Typography,
} from "@material-ui/core/";

const Contatos = () => {
  const url = "http://localhost:5000/message";
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [validator, setValidator] = useState(false);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function getMessages() {
      const response = await fetch(url);
      const data = await response.json();
      setMessages(data);
      console.log(data);
    }

    getMessages();
  }, [render]);

  const sendMessage = () => {
    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }
    const bodyForm = {
      email: author,
      message: content,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setRender(true);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      });

    setAuthor("");
    setContent("");

    console.log(content);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Grid container direction="row" xs={12}>
          <TextField
            id="name"
            label="Name"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
            fullWidth
          />
          <TextField
            id="message"
            label="Message"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            fullWidth
          />
        </Grid>

        {validator && (
          <div
            className="alert alert-warning alert-dismissible fade show mt-2"
            role="alert"
          >
            <strong>Por favor preencha todos os campos!</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        {success && (
          <div
            className="alert alert-success alert-dismissible fade show mt-2"
            role="alert"
          >
            <strong>Mensagem foi enviada</strong>
          </div>
        )}

        <Button
          onClick={sendMessage}
          className="mt-2"
          variant="contained"
          color="primary"
        >
          Sent
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {messages.map((msg) => {
          return (
            <React.Fragment key={msg.id}>
              <ListItem key={msg.id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography style={{ fontWeight: "bold" }}>
                      {msg.email}
                    </Typography>
                  }
                  secondary={
                    <>
                      {`${msg.message} - `}
                      <Typography
                        component="span"
                        style={{ display: "inline" }}
                      >
                        {new Date(msg.created_at).toLocaleString("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Contatos;
