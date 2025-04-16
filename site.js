// Utilitaires de localStorage
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function loadData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
  
  // Authentification
  function register() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    saveData(`user_${email}`, { email, pass });
    alert('Inscription réussie !');
  }
  
  function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const user = loadData(`user_${email}`);
    if (user && user.pass === pass) {
      localStorage.setItem('currentUser', email);
      window.location.href = 'Page_prin.html';
    } else {
      alert('Identifiants incorrects');
    }
  }
  
  function recover() {
    const email = prompt('Entrez votre adresse mail :');
    const user = loadData(`user_${email}`);
    if (user) {
      alert(`Mot de passe : ${user.pass}`);
    } else {
      alert("Compte introuvable.");
    }
  }
  
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'connexion.html';
  }
  
  // Variables globales
  let editIndex = null;
  
  // Récupération des champs
  function getFormData() {
    return {
      officier: document.getElementById('officier').value,
      suspect: document.getElementById('suspect').value,
      dob: document.getElementById('dob').value,
      birthplace: document.getElementById('birthplace').value,
      crime: document.getElementById('crime').value,
      sanction: document.getElementById('sanction').value
    };
  }
  
  function resetForm() {
    document.getElementById('officier').value = '';
    document.getElementById('suspect').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('birthplace').value = '';
    document.getElementById('crime').value = '';
    document.getElementById('sanction').value = '';
    editIndex = null;
  
    // Réinitialise le bouton
    const btn = document.getElementById('addBtn');
    btn.innerText = 'Créer Casier';
  }
  
  // Ajouter ou mettre à jour un casier
  function handleCasier() {
    const casiers = loadData('casiers');
    const data = getFormData();
  
    if (editIndex === null) {
      casiers.push(data); // Création
    } else {
      casiers[editIndex] = data; // Modification
    }
  
    saveData('casiers', casiers);
    displayCasiers();
    resetForm();
  }
  
  function displayCasiers() {
    const list = document.getElementById('casierList');
    if (!list) return;
    list.innerHTML = '';
  
    const casiers = loadData('casiers');
    casiers.forEach((c, i) => {
      const item = document.createElement('div');
      item.className = 'casier-item';
      item.innerHTML = `
        <p><strong>Officier :</strong> ${c.officier}</p>
        <p><strong>Suspect :</strong> ${c.suspect}</p>
        <p><strong>Date/lieu :</strong> ${c.dob} / ${c.birthplace}</p>
        <p><strong>Crime :</strong> ${c.crime}</p>
        <p><strong>Sanction :</strong> ${c.sanction}</p>
        <button onclick="deleteCasier(${i})">Supprimer</button>
        <button onclick="editCasier(${i})">Modifier</button>
      `;
      list.appendChild(item);
    });
  }
  
  function deleteCasier(index) {
    const casiers = loadData('casiers');
    casiers.splice(index, 1);
    saveData('casiers', casiers);
    displayCasiers();
    resetForm();
  }
  
  function editCasier(index) {
    const casiers = loadData('casiers');
    const c = casiers[index];
    editIndex = index;
  
    // Préremplir le formulaire
    document.getElementById('officier').value = c.officier;
    document.getElementById('suspect').value = c.suspect;
    document.getElementById('dob').value = c.dob;
    document.getElementById('birthplace').value = c.birthplace;
    document.getElementById('crime').value = c.crime;
    document.getElementById('sanction').value = c.sanction;
  
    // Changer le bouton
    const btn = document.getElementById('addBtn');
    btn.innerText = 'Mettre à jour';
  }
  
  // Groupes
  function createGroup() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert("Code de groupe : " + code);
    localStorage.setItem('groupCode', code);
  }
  
  function joinGroup() {
    const code = document.getElementById('groupCode').value.toUpperCase();
    if (code.length < 4) return alert("Code invalide.");
    localStorage.setItem('groupCode', code);
    alert("Rejoint le groupe : " + code);
  }

  // Affiche une alerte temporaire
function showAlert(message) {
    const alertBox = document.getElementById('alert');
    alertBox.innerText = message;
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 2000); // Masquer après 2 secondes
  }
  
  
  window.onload = displayCasiers;
  