from flask import Flask, request, jsonify,render_template
import json
import joblib
import math
import sys
import sqlite3
import pandas as pd

# print('Hello world!', file=sys.stderr)
app = Flask(__name__,static_folder='static')

model = joblib.load("../models/model.pkl")

engine = sqlite3.connect('../data/new.db')
df = pd.read_sql('SELECT * FROM dataset', engine)
country=df.columns[:-2].tolist()
height="0"
weight="0"
country_id="68"

@app.route('/height',methods=['POST'])
def get_height():
    global height
    rf=request.form
    for key in rf.keys():
        data=key
    data_dic=json.loads(data)
    height = data_dic['value']
    resp_dic={'answer':'ans'}
    resp = jsonify(resp_dic)
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp


@app.route('/weight',methods=['POST'])
def get_weight():
    global weight
    rf=request.form
    for key in rf.keys():
        data=key
    data_dic=json.loads(data)
    weight = data_dic['value']
    resp_dic={'returned':'came back'}
    resp = jsonify(resp_dic)
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp

@app.route('/country',methods=['POST'])
def get_country():
    global country_id
    rf=request.form
    for key in rf.keys():
        data=key
    print(data)
    data_dic=json.loads(data)
    country_mame = data_dic['value']
    country_id=country.index(country_mame)
    ans=predict_life(float(weight),float(height),int(country_id))
    resp_dic={'answer':math.ceil(ans)}
    resp = jsonify(resp_dic)
    resp.headers['Access-Control-Allow-Origin']='*'
    return resp

def predict_life(weight,height,country_id):
    bmi=weight/((height/100)**2)
    a=[0]*163
    a[country_id]=1
    a.append(bmi)
    query=model.predict([a])[0]
    return query


def main():
    app.run()


if __name__ == '__main__':
    main()
