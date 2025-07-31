import unittest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.calculator import add, multiply, divide

class TestCalculatorFunctional(unittest.TestCase):
    def test_user_workflow(self):
        total = add(5,10)
        product = multiply(total, 3)
        quotient = divide(product, 5)
        self.assertEqual(quotient, 9)

if __name__ == '__main__':
    unittest.main()