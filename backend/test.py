from passlib.hash import bcrypt
password = "0709"
hashed = bcrypt.hash(password)

print(hashed)
print(bcrypt.verify("0709", hashed))
print (bcrypt.verify("wrong",hashed))