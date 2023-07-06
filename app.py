from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    # return 'Hello World!'
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="127.0.0.1", debug=True, load_dotenv=True)
