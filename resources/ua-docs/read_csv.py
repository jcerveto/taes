import pandas as pd     # pip install pandas
import sys


def show_csv(file_path):
    df = pd.read_csv(file_path, sep=';')
    print(df)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python read_csv.py <file_path>")
        sys.exit(1)
    file_path = sys.argv[1]
    show_csv(file_path)

