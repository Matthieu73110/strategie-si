import unittest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.calculator import add, multiply

class TestCalculatorIntegration(unittest.TestCase):
    def test_add_and_mulitply(self):
        result = multiply(add(2, 3), 4)
        self.assertEqual(result, 20)

if __name__ == '__main__':
    unittest.main()