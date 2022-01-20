document.addEventListener('DOMContentLoaded', () => {
	getDogs();
	document.querySelector('form').addEventListener('submit', () => {
		submitchange(document.querySelector('form'));
	});
});

function getDogs() {
	fetch('http://localhost:3000/dogs')
	.then((r) => r.json())
	.then((dogs) => {
		for (dog of dogs) {
			addDog(dog);
		}
	});
}

function addDog(dog) {
	const tablebody = document.getElementById('table-body');
	const tablerow = document.createElement('tr');
	const name = document.createElement('td');
	const breed = document.createElement('td');
	const sex = document.createElement('td');
	const btnrow = document.createElement('td');
	const btn = document.createElement('button');

	name.textContent = dog.name;
	breed.textContent = dog.breed;
	sex.textContent = dog.sex;
	btn.textContent = 'Edit Dog';

	btnrow.appendChild(btn);
	tablerow.appendChild(name);
	tablerow.appendChild(breed);
	tablerow.appendChild(sex);
	tablerow.appendChild(btnrow);
	tablebody.appendChild(tablerow);

	btn.addEventListener('click', () => {
		const namebox = document.querySelector('form');
		namebox[0].value = dog.name;
		namebox[1].value = dog.breed;
		namebox[2].value = dog.sex;
		namebox.id = dog.id.toString();
	});
}

function submitchange(form) {
	fetch(`http://localhost:3000/dogs/${form.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: form[0].value,
			breed: form[1].value,
			sex: form[2].value
		})
	});
	document.getElementById('table-body').innerHTML = '';
	getDogs();
	form.reset();
	form.id = 'dog-form';
}