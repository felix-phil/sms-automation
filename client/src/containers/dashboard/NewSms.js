import React, { useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core'
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { useDispatch } from "react-redux"
import * as messageActions from "../../store/actions/message";
import  * as authActions from "../../store/actions/auth";

const NewSms = (props) => {
    const dispatch = useDispatch()
    const [phones, setPhones] = useState([{ phone: "", error: false, erroMessage: null }])
    const [body, setBody] = useState("")

    const handleAddPhone = () => {
        if (phones.length < 10) {
            setPhones(prev => [...prev, { phone: "", error: false, erroMessage: null }])
        } else {
            return
        }
    }
    const handlePhoneInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...phones];
        if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(value)) {
            list[index]["error"] = true
            list[index]["errorMessage"] = "Invalid phone Number"
        } else {
            list[index]["error"] = false
            list[index]["errorMessage"] = null
        }
        list[index][name] = value;
        setPhones(list);
    };

    const handleRemoveClick = index => {
        const list = [...phones];
        list.splice(index, 1);
        setPhones(list);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        for (const phone of phones) {
            if (!phone || !/^\+(?:[0-9] ?){6,14}[0-9]$/.test(phone.phone)) {
                dispatch(messageActions.setMessage(`Invalid phone number ${phone.phone}`, "error"))
                return
            }
        }
        if (!body) {
            dispatch(messageActions.setMessage(`Message body is required`, "error"))
            return
        }
        let phoneList = [];
        for (const phone of phones) {
            phoneList.push(phone.phone)
        }
        try {
            await dispatch(authActions.sendSMS(phoneList, body))
            // props.doRefresh()
            setBody("")
            setPhones([{ phone: "", error: false, errorMessage: null }])
        } catch (error) {
            dispatch(messageActions.setMessage(error.message, "error"))
        }
    }
    return (
        <div>
            <Card>
                <CardHeader
                    title="Send SMS"
                    subheader="Send broadcast SMS to anyone around the world"
                    avatar={
                        <Avatar aria-label="SMS" style={{ backgroundColor: "lightblue" }}>
                            <TextsmsRoundedIcon />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="Add Another Number" onClick={handleAddPhone}>
                            <AddRoundedIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {
                                phones.map((p, i) => {
                                    return (
                                        <Grid item xs={12} md={6} lg={4} key={i}>
                                            <FormControl variant="outlined">
                                                <InputLabel error={p.error} htmlFor="phone">Phone {i + 1}</InputLabel>
                                                <OutlinedInput
                                                    error={p.error}
                                                    name="phone"
                                                    id="phone"
                                                    type="tel"
                                                    required
                                                    value={p.phone}
                                                    onChange={e => handlePhoneInputChange(e, i)}
                                                    endAdornment={
                                                        phones.length > 1 ?
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="Remove"
                                                                    edge="end"
                                                                    onClick={() => handleRemoveClick(i)}
                                                                >
                                                                    <RemoveRoundedIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                            : <> </>
                                                    }
                                                    labelWidth={70}
                                                />
                                                <FormHelperText error={p.error}>{p.errorMessage}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    )
                                })
                            }
                            <Grid item xs={12}>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    multiline
                                    minRows={3}
                                    maxRows={5}
                                    id="body"
                                    label="Message Body"
                                />
                            </Grid>
                            <Button type="submit" startIcon={<TextsmsRoundedIcon />} fullWidth color="primary" variant="contained">SEND SMS</Button>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewSms
