from app.services.ai_service import predict_sentiment

text = "This product is amazing! I really loved it."

result = predict_sentiment(text)

print(result)