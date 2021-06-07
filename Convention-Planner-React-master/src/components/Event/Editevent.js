import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from '../../axios'
import {Link,Redirect,useHistory} from "react-router-dom"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
export default function AddressForm(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDesc] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [time, setTime] = useState('');
  const [state, setState] = useState('');
  const history = useHistory();
  const handleSubmission = async (e)=>{
   const postData= {
      name: name,
      price: price,
      description:description,
      address:address,
      city:city,
      pincode:pincode,
      country:country,
      time:time,
      state:state
    }
    console.log(postData);
    const data = await axios.put(`/event/${props.match.params.id}`,postData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
      }
    })
      console.log(data);
    history.push("/events")
    // loginCheck(data.data.data.token);
}

const parseDate = (date) =>{
  var d = new Date(date);
  if(d!="Invalid Date"){
    return d.toISOString().replace('Z', '')
  }
 return time
}
useEffect(() => {
  async function fetchData(str) {
    // console.log(localStorage.getItem("token"));
  const data = await axios.get(str, {
      headers: {
         Authorization: localStorage.getItem("token")// 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOGRkMGQ5YTMyZjUyMGVkNDI0NTQxNCIsImlhdCI6MTYwMzYzMTY4NSwiZXhwIjoxNjAzNjM1Mjg1fQ.MJSd5bwpTFfwCkArZao3Td-thXXuA6xabMgp9Ek0s3c" //the token is a variable which holds the token
      }
    })
    var count =0;
    count++;
  // setUser({user:data.data.data})
  if(count<=2){
  console.log(data.data.data.address);
    setName(data.data.data.name)
    setPrice(data.data.data.price)
    setDesc(data.data.data.description)
    setAddress(data.data.data.address)
    setCity(data.data.data.city)
    setPincode(data.data.data.pincode)
    setCountry(data.data.data.country)
    setTime(data.data.data.time)
    setState(data.data.data.state)
  }

  }

  fetchData(`/event/${props.match.params.id}`);
},[]);
  console.log(time)
  return (
    <Container maxWidth="sm">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Edit Event
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Event Name"
            fullWidth
            autoComplete=""
            onChange={e => setName(e.target.value)} 
            value={name}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            fullWidth
            autoComplete=""
            type="number"
            onChange={e => setPrice(e.target.value)} 
            value={price}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete=""
            onChange={e => setDesc(e.target.value)} 
            value={description}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={e => setAddress(e.target.value)} 
            value={address}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={e => setCity(e.target.value)} 
            value={city}
            variant="outlined"
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={e => setState(e.target.value)} value={state}  autoComplete="shipping state"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={e => setPincode(e.target.value)} 
            value={pincode}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            onChange={e => setCountry(e.target.value)} 
            value={country}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="time"
            name="time"
            fullWidth
            autoComplete="shipping address-level2"
            type="datetime-local"
            onChange={e => setTime(e.target.value)} 
            value={parseDate(time)}
            variant="outlined"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
       
        <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={handleSubmission}>
          Submit
        </Button>
        </Grid>

      </Grid>
    </React.Fragment>
    </Container>
  );
}