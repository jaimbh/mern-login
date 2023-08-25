import React, {useEffect, useState} from 'react';

export default function Contact(){
	
	const [userData, setUserData] = useState({});
	
	const userContact = async ()=>{
		try{
			const res = await fetch('/getdata', {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			
			const data = await res.json();
			setUserData(data);
			
		}catch(err){
			console.log(err);
		}
	}
	
	useEffect(()=>{
		userContact();
		// eslint-disable-next-line
	}, []);
	
	return(
		<>
		<div className="row m-3">
			<div className="col-sm-4 mb-3 mb-sm-0">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Phone</h5>
						<p className="card-text">+44 2422 444 2398</p>
					</div>
				</div>
			</div>
			<div className="col-sm-4 mb-3 mb-sm-0">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Email</h5>
						<p className="card-text">mail@mail.com</p>
					</div>
				</div>
			</div>
			<div className="col-sm-4 mb-3 mb-sm-0">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Address</h5>
						<p className="card-text">Whitefield park, NY</p>
					</div>
				</div>
			</div>
		</div>
		<div className="contact-form">
			<div className="container">
				<div className="row">
					<div className="contact-form-container py-5">
						<h2>Get in touch</h2><hr/>
						<form id="contact_form">
							<div className="row">
								<input type="text" className="form-control col m-3" id="name" placeholder="Your Name" value={userData.name} required/>
								<input type="email" className="form-control col m-3" id="email" placeholder="Your Email" value={userData.email} required/>
								<input type="number" className="form-control col m-3" id="phone" placeholder="Your Phone no." value={userData.phone} required/>
							</div>
							<textarea className="form-control my-2" id="message" placeholder="Your Message" rows="5"></textarea>
							<input type="submit" className="btn btn-primary" value="Submit"/>
						</form>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}