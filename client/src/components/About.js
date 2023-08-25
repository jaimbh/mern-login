import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import pic from '../images/cat.jpg';

export default function About(){
	const navigate = useNavigate();
	const [userData, setUserData] = useState({});
	
	const callAboutPage = async ()=>{
		try{
			const res = await fetch('/about', {
				method: 'get',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			
			const data = await res.json();
			setUserData(data);
			
		}catch(err){
			navigate('/login');
		}
	}
	
	useEffect(()=>{
		callAboutPage();
		// eslint-disable-next-line
	}, []);
	
	return(
		<>
		<div className="container p-5">
		<form method="get">
			<div className="row">
				<div className="col-md-4">
					<img src={pic} className="card-img-top" alt="cat"/>
				</div>
				<div className="col-md-6">
					<div className="profile-head">
						<h5>{userData.name}</h5>
						<h6>{userData.work}</h6>
						<p className="profile-rating mt-3 mb-5">Rankings: <span>1/10</span></p>
						<ul className="nav nav-tabs" role="tablist">
							<li className="nav-item"><a id="home-tab" data-toggle="tab" href="#home" role="tab" style={{textDecoration: 'none'}}>About</a></li>
							<li className="nav-item mx-2"><a id="profile-tab" data-toggle="tab" href="#profile" role="tab" style={{textDecoration: 'none'}}>Timeline</a></li>
						</ul>
					</div>
				</div>
				<div className="col-md-2">
					<input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<div className="profile-work">
						<p>WORK LINK</p>
						<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>Youtube</a><br/>
						<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>Instagram</a><br/>
						<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>Twitter</a><br/>
						<a href="https://www.github.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>Github</a><br/>
					</div>
				</div>
				<div className="col-md-8 pl-5 about-info">
					<div className="tab-content profile-tab" id="myTabContent">
						<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
							<div className="row">
								<div className="col-md-6">
									<label>User ID</label>
								</div>
								<div className="col-md-6">
									<p>{userData._id}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label>Name</label>
								</div>
								<div className="col-md-6">
									<p>{userData.name}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label>Email</label>
								</div>
								<div className="col-md-6">
									<p>{userData.email}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label>Phone</label>
								</div>
								<div className="col-md-6">
									<p>{userData.phone}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label>Profession</label>
								</div>
								<div className="col-md-6">
									<p>{userData.work}</p>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
							<div className="row">
								<div className="col-md-6">
									<label>Experience</label>
								</div>
								<div className="col-md-6">
									<p>Expert</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label>Rate</label>
								</div>
								<div className="col-md-6">
									<p>10$/hr</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label>Total Projects</label>
								</div>
								<div className="col-md-6">
									<p>11</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
		</div>
		</>
	);
}