document.getElementById('complaintForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const isXinYi = document.querySelector('input[name="isXinYi"]:checked').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const complaint = document.getElementById('complaint').value;

    fetch('/submit_complaint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isXinYi: isXinYi,
            name: name,
            phone: phone,
            email: email,
            complaint: complaint
        })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/thankyou';
        } else {
            alert('提交失敗，請重試。');
        }
    })
    .catch(error => console.error('Error:', error));
});
