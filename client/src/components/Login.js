import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const loginUser = async (e) => {
		e.preventDefault();
		
		const res = await fetch('/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email, password})
		});
		
		const data = await res.json();
		console.log(data);
		if(data.error){
			window.alert(data.error);
		}else{
			window.alert(data.message);
			navigate('/');
		}
	}
	
	return(
		<>
		<section className="sign-in">
			<div className="container mt-3">
				<div className="signin-content">
					<div className="signin-form">
						<h2 className="form-title">Sign In</h2><hr/>
						<form method="post" className="signin-form" id="signin-form">
							<input type="email" className="form-control m-3" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email"/>
							<input type="password" className="form-control m-3" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password"/>
							<input type="submit" className="btn btn-primary m-3" name="signin" id="signin" onClick={loginUser} value="Login"/>
						</form>
					</div>
				</div>
			</div>
		</section>
		</>
	);
}