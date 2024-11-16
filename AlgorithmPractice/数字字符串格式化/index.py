def solution(str):
    # write code here

    # 去掉前面的无用0
    str = str.lstrip('0')

    # 使用分割符分割整数部分和小数部分
    parts = str.split('.')
    integer_part = parts[0]
    decimal_part = parts[1] if len(parts) > 1 else ''

    # 将整数部分添加千分位逗号
    formatted_integer = '{:,}'.format(int(integer_part))

    # 如果有小数部分，返回格式化后的整数部分和小数部分
    return f"{formatted_integer}.{decimal_part}" if decimal_part else formatted_integer


if __name__ == '__main__':
    print(solution("1294512.12412") == '1,294,512.12412')
    print(solution("0000123456789.99") == '123,456,789.99')
    print(solution("987654321") == '987,654,321')