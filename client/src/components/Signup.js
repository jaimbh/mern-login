import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
	const navigate = useNavigate();
	const [user, setUser] = useState({name: '', email: '', phone: '', work: '', password: '', cpassword: ''});
	
	let name,value;
	const handleInputs = (e)=>{
		name = e.target.name;
		value = e.target.value;
		setUser({...user, [name]:value});
	}
	
	const PostData = async (e)=>{
		e.preventDefault();
		const {name, email, phone, work, password, cpassword} = user;
		
		const res = await fetch('/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name, email, phone, work, password, cpassword})
		});
		
		const data = await res.json();
		
		if(data.error){
			window.alert(data.error);
		}else{
			window.alert(data.message);
			navigate('/login');
		}
	}
	
	return(
		<>
		<section className="signup">
		<div className="container mt-3">
			<div className="signup-content">
				<div className="signup-form">
					<h2 className="form-title">Sign Up</h2><hr/>
					<form method="post" className="register-form" id="register-form">
						<input type="text" className="form-control m-3" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name"/>
						<input type="email" className="form-control m-3" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your Email"/>
						<input type="number" className="form-control m-3" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your Phone no."/>
						<input type="text" className="form-control m-3" name="work" id="work" autoComplete="off" value={user.work} onChange={handleInputs} placeholder="Your Profession"/>
						<input type="password" className="form-control m-3" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your Password"/>
						<input type="password" className="form-control m-3" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password"/>
						<input type="submit" className="btn btn-primary m-3" name="signup" id="signup" onClick={PostData} value="Register"/>
					</form>
				</div>
			</div>
		</div>
		</section>
		</>
	);
}