FROM python:3.11
WORKDIR /app
COPY api.py .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "api.py"]