package com.kavya.portfolio.mapper;

import java.util.List;

final class ListCopy {
  private ListCopy() {}
  static <T> List<T> of(List<T> values) {
    return values == null ? List.of() : List.copyOf(values);
  }
}
