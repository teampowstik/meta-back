from http import client
from django.shortcuts import redirect
from flask import Flask,jsonify,request
from flask import render_template
from flask.json import jsonify
import razorpay

app = Flask(__name__)

app.config['SECRET_KEY'] = 'PAYMENT_APP'

@app.route('/' , methods=['GET','POST'])
def index():
    # if request.method == 'POST':
    #     return redirect(url_for('pay'))
    return render_template('index.html')

@app.route('/pay' , methods=['GET','POST'])
def pay():

    client = razorpay.Client(auth=("rzp_test_UJ7AxMRWbVx9IE", "o5RHoEZeMpEkEHbhjH5PX9t4"))
    payment = client.order.create({'amount': 1300*100, 'currency': 'INR', 'payment_capture': '1'})
    return render_template('pay.html', payment=payment)

@app.route('/success' , methods=['GET','POST'])
def success():
    return render_template('success.html')

