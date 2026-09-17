expression = input("Expression: ").strip()

x_str, operator, z_str = expression.split(" ")

x = float(x_str)
z = float(z_str)

if operator == "+":
    result = x + z
elif operator == "-":
    result = x - z
elif operator == "*":
    result = x * z
elif operator == "/":
    result = x / z


print(round(result, 1))